import React, { useMemo } from 'react';
import '../gallery.styles.css';
import { useGallery } from '../gallery.context';

export const GalleryList: React.FC = () => {
  const { photos, hasMore, nextPage, page, prevPage } = useGallery();

  const memoPaginationElement = useMemo(() => {
    return (
      <div className='pagination'>
        {page > 1 && (
          <div>
            <button onClick={prevPage}>Prev</button>
          </div>
        )}
        <div>
          <span>{page}</span>
        </div>
        {hasMore && (
          <div>
            <button onClick={nextPage}>Next</button>
          </div>
        )}
      </div>
    );
  }, [hasMore, nextPage, page, prevPage]);

  return (
    <>
      {memoPaginationElement}
      <section className='gallery' data-testid='gallery' aria-label='Galería de imágenes'>
        {photos?.map((itemPhoto, indexPhoto) => {
          return (
            <article className='card' key={indexPhoto} data-testid='gallery-photo-card'>
              <figure className='card-image'>
                <img src={itemPhoto.previewUrl} alt={itemPhoto.name} />
              </figure>
            </article>
          );
        })}
      </section>
    </>
  );
};
