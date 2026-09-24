import { useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { sections } from '@/lib/businessPhotos';

export type AdminPhoto = {
  section: Section;
  alt: string;
  updatedAt: string;
  smallPath: string;
  largePath: string;
};
type Section = 'catering' | 'studio' | 'beauty' | 'supply';

async function resizedWebp(file: File, maxWidth: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, maxWidth / bitmap.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is unavailable in this browser.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Could not optimize image.')), 'image/webp', 0.82);
    });
    if (blob.type !== 'image/webp' || blob.size > 4_000_000) throw new Error('Image must be WebP and under 4 MB.');
    return blob;
  } finally {
    bitmap.close();
  }
}

async function uploadPhoto(blob: Blob, section: Section, size: 'small' | 'large'): Promise<string> {
  const fileName = `${size}/${section}-${crypto.randomUUID()}.webp`;
  const { error } = await supabase
    .storage
    .from('business-photos')
    .upload(fileName, blob, { contentType: 'image/webp' });
  if (error) throw error;
  // Return the path (used to construct public URL)
  return fileName;
}

function PhotoForm({ section, current }: { section: Section; current?: AdminPhoto }) {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState(current?.alt ?? '');
  const [approved, setApproved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || !approved) return;
    const fileInput = event.currentTarget.querySelector<HTMLInputElement>('input[type=file]');
    setBusy(true);
    setMessage('');
    try {
      const [smallBlob, largeBlob] = await Promise.all([
        resizedWebp(file, 480),
        resizedWebp(file, 960),
      ]);
      const [smallPath, largePath] = await Promise.all([
        uploadPhoto(smallBlob, section, 'small'),
        uploadPhoto(largeBlob, section, 'large'),
      ]);
      await supabase
        .from('business_photos')
        .upsert(
          { section, alt: alt.trim(), smallPath, largePath, updatedAt: new Date().toISOString() },
          { onConflict: 'section' }
        );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['admin-business-photos'] }),
        queryClient.invalidateQueries({ queryKey: ['business-photos'] }),
      ]);
      setFile(null);
      setApproved(false);
      setMessage('Photo published. The public website now shows this photo.');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not publish photo.');
    } finally {
      setBusy(false);
    }
  }

  async function unpublish() {
    if (!window.confirm('Remove this photo from the public site? The illustrative image will return.')) return;
    setBusy(true);
    setMessage('');
    try {
      await supabase
        .from('business_photos')
        .delete()
        .eq('section', section);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['admin-business-photos'] }),
        queryClient.invalidateQueries({ queryKey: ['business-photos'] }),
      ]);
      setMessage('Photo removed from the public site.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not remove photo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-card" onSubmit={submit}>
      <h2>{sections.find((item) => item.id === section)?.title}</h2>
      <p>{current ? 'Published photo' : 'No approved photo yet. The website shows an illustrative image.'}</p>
      {current && (
        <img
          className="admin-preview"
          src={supabase.storage.from('business-photos').getPublicUrl(current.smallPath).data.publicUrl}
          alt={current.alt}
          loading="lazy"
        />
      )}
      <label htmlFor={`photo-${section}`}>Original photo</label>
      <input
        id={`photo-${section}`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        disabled={busy}
      />
      <label htmlFor={`alt-{section}`}>Image description for screen readers</label>
      <input
        id={`alt-{section}`}
        value={alt}
        minLength={12}
        maxLength={180}
        required
        placeholder="Describe the actual ALCA work shown"
        onChange={(event) => setAlt(event.target.value)}
        disabled={busy}
      />
      <label className="admin-consent">
        <input
          type="checkbox"
          checked={approved}
          onChange={(event) => setApproved(event.target.checked)}
          required
          disabled={busy}
        />
        I confirm ALCA approved this original photo for publication and I have permission from the photographer and anyone identifiable.
      </label>
      <div className="admin-actions">
        <button
          className="button primary"
          disabled={busy || !file || !approved}
          type="submit"
        >
          {busy ? 'Processing…' : current ? 'Replace published photo' : 'Publish photo'}
        </button>
        {current && (
          <button
            className="button outline"
            type="button"
            disabled={busy}
            onClick={unpublish}
          >
            Unpublish
          </button>
        )}
      </div>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function PhotoAdmin() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['admin-business-photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_photos')
        .select('*');
      if (error) throw error;
      return data as AdminPhoto[];
    },
    retry: false,
  });
  return (
    <main className="admin-page">
      <header className="admin-head">
        <div>
          <span className="eyebrow">ALCA</span>
          <h1>Photo admin</h1>
        </div>
        <div className="admin-actions">
          <Link href="/">View website</Link>
        </div>
      </header>
      <p>
        Only upload actual ALCA work with publication permission. Photos are optimized for mobile automatically. A published photo replaces its labeled illustrative image.
      </p>
      {isLoading && <p>Loading sections…</p>}
      {error && (
        <div role="alert" className="admin-error">
          <p>{error.message}</p>
          <button type="button" onClick={() => refetch()}>Try again</button>
        </div>
      )}
      {data && (
        <div className="admin-grid">
          {sections.map(({ id }) => (
            <PhotoForm
              key={`${id}-${data.find((item) => item.section === id)?.updatedAt ?? 'empty'}`}
              section={id}
              current={data.find((item) => item.section === id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}