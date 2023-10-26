/* eslint-disable no-undef */
import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";

const DirectionsMap = ({ origin, destination, latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBv4tnbV1KhqnQmaRGrge5gMrWLzgblWpU",
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };
  useEffect(() => {
    const mapDirection = async () => {
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
    };
    mapDirection();
  }, [destination, origin]);
  if (!isLoaded) {
    return <div>No map</div>;
  }
  console.log(center);
  return (
    <GoogleMap
      center={{ lat: latitude, lng: longitude }}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "600px" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={center} />
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
};

export default DirectionsMap;
