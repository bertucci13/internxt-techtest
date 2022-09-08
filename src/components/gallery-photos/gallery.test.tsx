import { render, screen, waitFor } from '@testing-library/react';
import { GalleryPhotos } from './gallery';

describe('Gallery photos', () => {
  it('Spinner shows and hide after fetch', async () => {
    render(<GalleryPhotos />);
    const ellipsisElement = screen.getByTestId('spinner-ellipsis');
    expect(ellipsisElement).toBeInTheDocument();
    await waitFor(() => expect(ellipsisElement).not.toBeInTheDocument(), { timeout: 2000 });
  });

  it('Photo gallery is showed', async () => {
    render(<GalleryPhotos />);

    await waitFor(
      () => {
        var gallery = screen.queryByTestId('gallery');
        expect(gallery).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
