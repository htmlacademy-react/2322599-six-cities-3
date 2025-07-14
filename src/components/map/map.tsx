import { useRef, useEffect, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offers';
import 'leaflet/dist/leaflet.css';

const URL_DEFAULT_ICON = 'img/pin.svg';
const URL_ACTIVE_ICON = 'img/pin-active.svg';

type MapProps = {
  city: Offer['city'];
  offers: Offer[];
  selectedOfferId?: string;
};

const defaultIcon = new Icon({
  iconUrl: URL_DEFAULT_ICON,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const activeIcon = new Icon({
  iconUrl: URL_ACTIVE_ICON,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function MapComponent({ city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOfferId !== undefined && offer.id === selectedOfferId
              ? activeIcon
              : defaultIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

const areEqual = (prevProps: MapProps, nextProps: MapProps) => (
  prevProps.city === nextProps.city &&
  prevProps.offers === nextProps.offers &&
  prevProps.selectedOfferId === nextProps.selectedOfferId
);

export const Map = memo(MapComponent, areEqual);
