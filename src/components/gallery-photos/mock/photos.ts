import { Photo } from '../../../types/photos';
import { PHOTOS_PAGE_LIMIT } from '../../../__dont_modify__/api/photos';
import { createPhotoFixture } from '../../../__dont_modify__/fixtures/photos';

export const photosMock = () => {
  const photos: Photo[] = [];

  // Create a bunch of photos
  for (let i = 0; i < PHOTOS_PAGE_LIMIT; i++) {
    photos.push(createPhotoFixture());
  }
  return photos;
};
