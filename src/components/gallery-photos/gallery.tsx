import React from 'react';
import * as GalleryPhotosTypes from './types';
import { GalleryProvider } from './gallery.context';
import { GalleryLayout } from './components/galleryLayout';

export const GalleryPhotos: React.FC<GalleryPhotosTypes.GalleryPhotosProps> = () => {
  return (
    <div className='App' data-testid='App'>
      <GalleryProvider>
        <GalleryLayout />
      </GalleryProvider>
    </div>
  );
};
