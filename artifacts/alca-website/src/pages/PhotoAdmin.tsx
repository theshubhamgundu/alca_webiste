import { useState, type FormEvent } from 'react';
import { useAuth, useClerk } from '@clerk/react';
import { Link } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest, sections, type Section } from '@/lib/businessPhotos';

type AdminPhoto = {
  section: Section;
  alt: string;
  updatedAt: string;
};
type UploadTicket = { uploadUrl: string; objectPath: string };

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

async function uploadPhoto(blob: Blob): Promise<string> {
  const ticket = await apiRequest<UploadTicket>('/admin/business-photos/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contentType: 'image/webp', size: blob.size }),
  });
  const response = await fetch(ticket.uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'image/webp' }, body: blob });
  if (!response.ok) throw new Error('Image upload failed. Please try again.');
  return ticket.objectPath;
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
      const [small, large] = await Promise.all([resizedWebp(file, 480), resizedWebp(file, 960)]);
      const [smallPath, largePath] = await Promise.all([uploadPhoto(small), uploadPhoto(large)]);
      await apiRequest('/admin/business-photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, smallPath, largePath, alt: alt.trim(), approved: true }),
      });
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
      await apiRequest(`/admin/business-photos/${section}`, { method: 'DELETE' });
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
      {current && <img className="admin-preview" src={`/api/business-photos/${section}/small?v=${encodeURIComponent(current.updatedAt)}`} alt={current.alt} loading="lazy" />}
      <label htmlFor={`photo-${section}`}>Original photo</label>
      <input id={`photo-${section}`} type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} disabled={busy} />
      <label htmlFor={`alt-${section}`}>Image description for screen readers</label>
      <input id={`alt-${section}`} value={alt} minLength={12} maxLength={180} required placeholder="Describe the actual ALCA work shown" onChange={(event) => setAlt(event.target.value)} disabled={busy} />
      <label className="admin-consent"><input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} required disabled={busy} /> I confirm ALCA approved this original photo for publication and I have permission from the photographer and anyone identifiable.</label>
      <div className="admin-actions">
        <button className="button primary" disabled={busy || !file || !approved} type="submit">{busy ? 'Processing…' : current ? 'Replace published photo' : 'Publish photo'}</button>
        {current && <button className="button outline" type="button" disabled={busy} onClick={unpublish}>Unpublish</button>}
      </div>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function PhotoAdmin() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['admin-business-photos'],
    queryFn: () => apiRequest<AdminPhoto[]>('/admin/business-photos'),
    enabled: !!isSignedIn,
    retry: false,
  });
  if (!isLoaded) return <main className="admin-page"><p>Loading sign-in…</p></main>;
  if (!isSignedIn) return <main className="admin-page"><h1>ALCA admin</h1><p>Sign in with the approved ALCA admin account to manage business photos.</p><Link href="/sign-in" className="button primary">Sign in</Link></main>;
  return (
    <main className="admin-page">
      <header className="admin-head"><div><span className="eyebrow">ALCA</span><h1>Photo admin</h1></div><div className="admin-actions"><Link href="/">View website</Link><button type="button" className="button outline" onClick={() => signOut({ redirectUrl: import.meta.env.BASE_URL })}>Sign out</button></div></header>
      <p>Only upload actual ALCA work with publication permission. Photos are optimized for mobile automatically. A published photo replaces its labeled illustrative image.</p>
      {isLoading && <p>Loading sections…</p>}
      {error && <div role="alert" className="admin-error"><p>{error.message}</p><button type="button" onClick={() => refetch()}>Try again</button></div>}
      {data && <div className="admin-grid">{sections.map(({ id }) => <PhotoForm key={`${id}-${data.find((item) => item.section === id)?.updatedAt ?? 'empty'}`} section={id} current={data.find((item) => item.section === id)} />)}</div>}
    </main>
  );
}