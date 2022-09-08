import { render, screen, waitFor } from '@testing-library/react';
import { PHOTOS_PAGE_LIMIT } from '../../../__dont_modify__/api/photos';

import { GalleryContextProps, GalleryContext, initialStateGalleryContext } from '../gallery.context';
import { photosMock } from '../mock/photos';
import { GalleryList } from './galleryList';

describe('Gallery photos', () => {
  it('has same amount of cards as photos are provided', async () => {
    const galleryContext: GalleryContextProps = {
      ...initialStateGalleryContext,
      isFetching: false,
      isError: false,
      photos: photosMock(),
      page: 1,
    };
    render(
      <GalleryContext.Provider value={galleryContext}>
        <GalleryList />
      </GalleryContext.Provider>
    );

    await waitFor(
      async () => {
        const galleryItems = await screen.findAllByTestId('gallery-photo-card');
        expect(galleryItems).toHaveLength(PHOTOS_PAGE_LIMIT);
      },
      { timeout: 3000 }
    );
  });
});
