import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabaseClient';

export type Section = 'catering' | 'studio' | 'beauty' | 'supply';
export const sections: { id: Section; title: string }[] = [
  { id: 'catering', title: 'Food & Catering' },
  { id: 'studio', title: 'Designer Studio' },
  { id: 'beauty', title: 'Luxury Beauty & Modelling' },
  { id: 'supply', title: 'Supply & Manufacturing' },
];
export type PublishedPhoto = {
  section: Section;
  alt: string;
  version: number;
  smallPath: string;
  largePath: string;
};

export function usePublishedPhotos() {
  return useQuery({
    queryKey: ['business-photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_photos')
        .select('section, alt, smallPath, largePath, updatedAt');
      if (error) throw error;
      // Map to PublishedPhoto format: section, alt, version (timestamp), smallPath, largePath
      return data.map((row) => ({
        section: row.section as Section,
        alt: row.alt,
        version: new Date(row.updatedAt).getTime(),
        smallPath: row.smallPath as string,
        largePath: row.largePath as string,
      })) as PublishedPhoto[];
    },
    staleTime: 60_000,
    retry: 1,
  });
}