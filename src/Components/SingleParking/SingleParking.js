import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fromLatLng, setKey } from "react-geocode";
import { Link, useParams } from "react-router-dom";
import DirectionsMap from "../DirectionsMap/DirectionsMap";

const SingleParking = () => {
  const { id } = useParams();
  const [parkingData, setParkingData] = useState({});
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  console.log(id);
  useEffect(() => {
    // console.log(ipDetails);
    const getLocation = async () => {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
              reject(
                new Error("Geolocation is not available in this browser.")
              );
            }
          });
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(location);
        } catch (err) {
          console.log(err.message);
        }
      }
      console.log(location);
    };
    getLocation();
  }, []);
  useEffect(() => {
    if (location) {
      setKey("AIzaSyBO8vP9zG-H0Cncs8Qucad9howK_CQyJf4");
      fromLatLng(location?.latitude, location?.longitude)
        .then(({ results }) => {
          console.log(location);
          const { lat, lng } = results[0].geometry.location;
          setAddress(results[0]);
          // console.log(lat, lng);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [location]);
  useEffect(() => {
    const fetchSingleParkingDetails = async () => {
      await axios
        .get(`/api/v1/parking/view-parking/${id}`)
        .then((data) => setParkingData(data.data));
    };
    fetchSingleParkingDetails();
  }, []);

  console.log(address);
  console.log(parkingData);
  return (
    <div>
      <p className="text-3xl text-center my-5">Parking Details</p>
      <div className="details text-center text-xl my-2">
        <div className="slot">
          <p>Slot: {parkingData?.parkingSlotName}</p>
        </div>
        <div className="location">
          <p>Location:{parkingData?.parkingLocation}</p>
        </div>
        <div className="postcode">
          <p>Postcode:{parkingData?.postCode}</p>
        </div>
        <div className="country mb-3">
          <p>Country:{parkingData?.country}</p>
        </div>
        <div className="book bg-blue-500 inline px-2 py-1">
          <Link to={`/view-parking/book/${parkingData?._id}`}>
            <button>Book</button>
          </Link>
        </div>
      </div>
      <DirectionsMap
        apikey="AIzaSyBv4tnbV1KhqnQmaRGrge5gMrWLzgblWpU"
        origin={address?.formatted_address}
        destination={parkingData?.address}
        latitude={location?.latitude}
        longitude={location?.longitude}
      ></DirectionsMap>
    </div>
  );
};

export default SingleParking;
