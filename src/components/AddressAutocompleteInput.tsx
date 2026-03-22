import React, { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'google-maps-places-sdk';

type AddressAutocompleteInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'ref'
>;

/**
 * Address search via Google Places Autocomplete when `REACT_APP_GOOGLE_PLACES_API_KEY` is set.
 * Users can always type or paste manually if nothing matches (e.g. rural plots).
 */
const AddressAutocompleteInput: React.FC<AddressAutocompleteInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY?.trim();

  useEffect(() => {
    if (!apiKey) return;

    if (window.google?.maps?.places) {
      setSdkReady(true);
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      const onLoad = () => setSdkReady(true);
      if (window.google?.maps?.places) {
        onLoad();
      } else {
        existing.addEventListener('load', onLoad);
      }
      return () => existing.removeEventListener('load', onLoad);
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Places sometimes attaches one tick after script load
      requestAnimationFrame(() => setSdkReady(true));
    };
    script.onerror = () => {
      // eslint-disable-next-line no-console -- deploy / key diagnostics
      console.error(
        '[AddressAutocomplete] Failed to load Google Maps JS. Check REACT_APP_GOOGLE_PLACES_API_KEY, billing, and API enablement (Maps JavaScript API + Places API).'
      );
    };
    document.head.appendChild(script);
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey || !sdkReady || !inputRef.current) return;
    const g = window.google;
    if (!g?.maps?.places) return;

    const input = inputRef.current;
    const Autocomplete = g.maps.places.Autocomplete;
    const autocomplete = new Autocomplete(input, {
      fields: ['formatted_address', 'name', 'address_components'],
    });

    const handlePlace = () => {
      const place = autocomplete.getPlace();
      const formatted = place.formatted_address;
      if (formatted) {
        input.value = formatted;
      }
    };

    const listener = g.maps.event.addListener(autocomplete, 'place_changed', handlePlace);

    return () => {
      listener.remove();
      g.maps.event.clearInstanceListeners(input);
    };
  }, [apiKey, sdkReady]);

  return (
    <input
      ref={inputRef}
      {...props}
      autoComplete="off"
      data-lpignore="true"
    />
  );
};

export default AddressAutocompleteInput;
