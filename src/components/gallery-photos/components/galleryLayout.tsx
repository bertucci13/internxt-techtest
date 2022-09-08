import { Spinner } from '../../../common/ui/spinner/spinner';
import { useGallery } from '../gallery.context';
import { GalleryList } from './galleryList';

export const GalleryLayout: React.FC = () => {
  const { isFetching, isError, refetch } = useGallery();

  return (
    <>
      {isFetching && (
        <div>
          <Spinner />
        </div>
      )}
      {isError && !isFetching && (
        <h3 className='error-text'>
          An error has ocurred, Please retry <button onClick={refetch}>Try again</button>
        </h3>
      )}
      {!isFetching && !isError && <GalleryList />}
    </>
  );
};
