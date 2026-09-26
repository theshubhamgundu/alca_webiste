// Shows the real ALCA images embedded in the original website source.
const galleryPhotos = [
  { file: 'trays', alt: 'Fresh fruit slices drying on ALCA Bites trays', caption: 'From the ALCA Bites kitchen' },
  { file: 'apricot', alt: 'ALCA Bites Apricot Delight dessert poster', caption: 'Apricot Delight' },
  { file: 'wow', alt: 'Wow Magical Celebrations event showcase', caption: 'Wow Magical Celebrations' },
  { file: 'idol', alt: 'ALCA Varalakshmi Devi handmade idol collection', caption: 'Varalakshmi Devi idols' },
  { file: 'gift', alt: 'ALCA customised gift collection', caption: 'Customized Gifts' },
  { file: 'figurine', alt: 'ALCA custom couple figurine artwork', caption: 'Couple figurines' },
] as const;

export type AlcaPhoto = (typeof galleryPhotos)[number];

const sectionPhotos: Record<string, AlcaPhoto[]> = {
  bites: galleryPhotos.slice(0, 2),
  celebrations: galleryPhotos.slice(2, 3),
  gifts: galleryPhotos.slice(3),
};

function PhotoCard({ photo, priority = false }: { photo: AlcaPhoto; priority?: boolean }) {
  return (
    <figure className="alca-photo">
      <img
        src={`${import.meta.env.BASE_URL}images/${photo.file}.webp`}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

export function PhotoGallery() {
  return (
    <div className="alca-gallery" aria-label="Photos from ALCA">
      <div className="alca-gallery-track">
        {galleryPhotos.map((photo) => <PhotoCard key={photo.file} photo={photo} priority />)}
        <div className="alca-gallery-repeat" aria-hidden="true">
          {galleryPhotos.map((photo) => <PhotoCard key={`repeat-${photo.file}`} photo={photo} />)}
        </div>
      </div>
    </div>
  );
}

export function BusinessPhotos({ business }: { business: string }) {
  const photos = sectionPhotos[business];
  if (!photos) return null;
  return (
    <div className="business-photos" aria-label={`${business} photos`}>
      {photos.map((photo) => <PhotoCard key={photo.file} photo={photo} />)}
    </div>
  );
}