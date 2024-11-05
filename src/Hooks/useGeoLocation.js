import { useState } from "react";

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [posation, setPosation] = useState({});
  const [error, setError] = useState(false);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser oes not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err?.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, posation, error, getPosition };
}

export default useGeoLocation;
