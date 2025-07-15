import { memo } from 'react';

type OfferGalleryProps = {
  images: string[];
};

function OfferGalleryComponent({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images?.slice(0, 6).map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img className="offer__image" src={image} alt="Place image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const OfferGallery = memo(OfferGalleryComponent, (prev, next) =>
  prev.images === next.images
);
