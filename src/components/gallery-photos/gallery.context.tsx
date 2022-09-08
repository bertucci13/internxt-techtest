import React, { useCallback } from 'react';

import { GetPhotosResponse, photosApi } from '../../__dont_modify__/api/photos';

interface GalleryDataContextProps extends GetPhotosResponse {
  isFetching: boolean;
  isError: boolean;
}
export interface GalleryContextProps extends GetPhotosResponse {
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const initialStateGalleryContext: GalleryContextProps = {
  isFetching: true,
  isError: false,
  page: 1,
  total: 0,
  hasMore: false,
  photos: [],
  refetch: () => {
    // EMPTY
  },
  nextPage: () => {
    // EMPTY
  },
  prevPage: () => {
    // EMPTY
  },
};

const GalleryContext = React.createContext<GalleryContextProps>({
  ...initialStateGalleryContext,
});

type Props = {
  children: React.ReactNode;
};

export const GalleryProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [data, setData] = React.useState<GalleryDataContextProps>({ ...initialStateGalleryContext });

  React.useEffect(() => {
    fetchData(data?.page || initialStateGalleryContext.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetch Photos
   */
  const fetchData = useCallback(async (page: number) => {
    try {
      const response = await photosApi.getPhotos({ page: page });

      setTimeout(() => {
        setData({ ...response, isFetching: false, isError: false });
      }, 100);
    } catch (error) {
      // Handle Error
      console.error(error);
      setData(({ page }) => ({ ...initialStateGalleryContext, page, isFetching: false, isError: true }));
    }
  }, []);

  /**
   * Refetch
   * Fired by page change
   */
  const refetch = useCallback(async () => {
    setData((current) => ({ ...current, isFetching: true, isError: false }));
    fetchData(data?.page || initialStateGalleryContext.page);
  }, [data.page, fetchData]);

  /**
   * NextPage handler
   */
  const nextPage = useCallback(async () => {
    setData((current) => ({ ...current, isFetching: true, isError: false }));
    fetchData(data?.page + 1);
  }, [data.page, fetchData]);

  /**
   * NextPage handler
   */
  const prevPage = useCallback(async () => {
    setData((current) => ({ ...current, isFetching: true, isError: false }));
    fetchData(data?.page - 1);
  }, [data.page, fetchData]);

  const contextValue = React.useMemo(() => {
    return { ...data, refetch, nextPage, prevPage };
  }, [data, nextPage, refetch, prevPage]);

  return <GalleryContext.Provider value={contextValue}>{children}</GalleryContext.Provider>;
};

const useGallery = () => React.useContext(GalleryContext);
const GalleryContextConsumer = GalleryContext.Consumer;

export { GalleryContext, useGallery, GalleryContextConsumer };
