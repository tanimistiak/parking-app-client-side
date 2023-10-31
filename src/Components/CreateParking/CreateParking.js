/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import useIp from "../utils/Hooks/useIp";
import axios from "axios";
import { Controller, get, useForm } from "react-hook-form";
import LoginRegister from "../Login/LoginRegister";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import { fromLatLng, geocode, setKey } from "react-geocode";

const CreateParking = () => {
  const { email, location, setLocation } = useContext(LoginRegisterContext);
  const [ipDetails, setIpDetails] = useState(null);
  const [address, setAddress] = useState("");
  // const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  /*   const [ip, setIp] = useState();
  useEffect(() => {
    const fetchIp = async () => {
      await axios
        .get("/")
        .then((res) => setIp(res.data.ip))
        .catch((err) => console.log(err));
    };
    fetchIp();
  }, []);
  useEffect(() => {
    const fetchIpDetails= async()=>{
      await axios.get('')
    }
  }, [ip]); */
  useEffect(() => {
    // console.log(ipDetails)
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
          setAddress(results[1]);
          // console.log(lat, lng);
          console.log(results);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [location]);
  console.log(address);
  const onSubmit = async (data) => {
    const duration = [];
    console.log(data);
    if (data.days) {
      duration.push("days");
    }
    if (data.hours) {
      duration.push("hours");
    }
    if (data.minutes) {
      duration.push("minutes");
    }
    await axios
      .post("/api/v1/parking/", {
        parkingLocation: data.parkingLocation,
        parkingSlotName: data.parkingSlotName,
        duration: duration,
        city: data.city,
        country: data.country,
        postCode: data.postCode,
        createdBy: email,
        fullAddress: address,
        address: address?.formatted_address,
        placeId: address?.place_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <OwnerProfileDashboardHeader />
      {address && (
        <div className="create-parking-form flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-80 border border-black mb-5 mt-5 p-3"
              placeholder="Parking slot name"
              {...register("parkingSlotName", { required: true })}
            />{" "}
            <br />
            <input
              className="w-80 border border-black mb-5 mt-5 p-3"
              defaultValue={address?.address_components[3]?.long_name}
              {...register("city", { required: true })}
            />{" "}
            <br />
            <input
              defaultValue={address?.formatted_address.split(",")[2]}
              readOnly
              className="w-80 border border-black mb-5 p-3"
              {...register("country", { required: true })}
            />
            <br />
            <input
              defaultValue={address?.formatted_address}
              readOnly
              className="w-80 border border-black mb-5 p-3"
              {...register("parkingLocation", { required: true })}
            />
            <br />
            <input
              placeholder="input postcode"
              type="text"
              className="w-80 border border-black mb-5 p-3"
              {...register("postCode", { required: true })}
            />
            <br />
            <label className="mr-2">Select Duration</label>
            <label>
              <Controller
                name="minutes"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => <input type="checkbox" {...field} />}
              />
              Minutes
            </label>
            <label className="mx-2">
              <Controller
                name="hours"
                control={control}
                render={({ field }) => <input type="checkbox" {...field} />}
              />
              Hours
            </label>
            <label className="mx-2">
              <Controller
                name="days"
                control={control}
                render={({ field }) => <input type="checkbox" {...field} />}
              />
              Days
            </label>
            <br />
            {errors.exampleRequired && <span>This field is required</span>}
            <input
              className="w-80 border border-black mb-5 p-3"
              type="submit"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default CreateParking;
