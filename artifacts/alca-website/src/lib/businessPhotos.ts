import { useQuery } from '@tanstack/react-query';

export type Section = 'catering' | 'studio' | 'beauty' | 'supply';
export const sections: { id: Section; title: string }[] = [
  { id: 'catering', title: 'Food & Catering' },
  { id: 'studio', title: 'Designer Studio' },
  { id: 'beauty', title: 'Luxury Beauty & Modelling' },
  { id: 'supply', title: 'Supply & Manufacturing' },
];
export type PublishedPhoto = { section: Section; alt: string; version: number };

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, { ...init, credentials: 'same-origin' });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.status === 204 ? undefined as T : response.json() as Promise<T>;
}

export function usePublishedPhotos() {
  return useQuery({
    queryKey: ['business-photos'],
    queryFn: () => apiRequest<PublishedPhoto[]>('/business-photos'),
    staleTime: 60_000,
    retry: 1,
  });
}