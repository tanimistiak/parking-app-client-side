/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import useIp from "../utils/Hooks/useIp";
import axios from "axios";
import { Controller, get, useForm } from "react-hook-form";
import LoginRegister from "../OwnerLoginRegister/OwnerRegister";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import { fromLatLng, geocode, setKey } from "react-geocode";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import { getStorage, ref } from "firebase/storage";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { v4 } from "uuid";
import firebaseStorage from "../../firebase.config copy";
import ProgressBar from "@ramonak/react-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const storage = getStorage();
const CreateParking = () => {
  const { location, setLocation } = useContext(LoginRegisterContext);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [address, setAddress] = useState("");
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
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

    const storageRef = ref(storage, `${data.image[0].name + v4()}`);
    console.log(data.image[0]);
    const result = await uploadFile(storageRef, data.image[0], {
      contentType: "",
    });

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

    console.log();
    const body = {
      parkingLocation: data.parkingLocation,
      parkingSlotName: data.parkingSlotName,
      duration: duration,
      city: data.city,
      country: data.country,
      postCode: data.postCode,
      createdBy: user?.email,
      fullAddress: address,
      address: address?.formatted_address,
      placeId: address?.place_id,
      image:
        "https://firebasestorage.googleapis.com/v0/b/parking-management-ed2e7.appspot.com/o/" +
        result?.metadata?.fullPath +
        "?alt=media",
    };
    await axios
      .post("/api/v1/parking", body)
      .then((data) => {
        console.log(data);
        if (data.data.parkingLocation) {
          toast("Successfully created parking");
        } else {
          toast("could not create parking");
        }
      })
      .catch((err) => console.log(err));
    // Handle form submission logic here
    console.log(body);

    // alert(`Result: ${JSON.stringify(result)}`);

    console.log(body);
  };
  return (
    <div className="bg-gray-200">
      <OwnerProfileDashboardHeader />
      {address && (
        <div className="create-parking-form flex justify-center py-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              Parking Slot Information
            </h2>
            <div className="mb-4">
              <label
                htmlFor="parkingSlotName"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot Name
              </label>
              <input
                type="text"
                id="parkingSlotName"
                name="parkingSlotName"
                {...register("parkingSlotName", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="parkingSlotLocation"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot Location
              </label>
              <input
                type="text"
                id="parkingSlotLocation"
                name="parkingSlotLocation"
                defaultValue={address?.formatted_address}
                readOnly
                {...register("parkingLocation", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="parkingSlotCity"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot City
              </label>
              <input
                type="text"
                id="parkingSlotCity"
                name="parkingSlotCity"
                readOnly
                defaultValue={address?.address_components?.[3]?.long_name}
                {...register("city", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="parkingSlotCountry"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot Country
              </label>
              <input
                type="text"
                id="parkingSlotCountry"
                name="parkingSlotCountry"
                defaultValue={address?.formatted_address.split(",")[2]}
                readOnly
                {...register("country", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="parkingSlotPostCode"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot Post Code
              </label>
              <input
                type="number"
                id="parkingSlotPostCode"
                placeholder="Your postcode"
                name="parkingSlotPostCode"
                {...register("postCode", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Parking Slot Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", { required: true })}
                className="block w-full py-2 px-3 text-gray-700 leading-tight border border-gray-300 rounded-md focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
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
              </div>
            </div>

            {errors && (
              <p className="text-red-500 text-center">
                Complete all the fields are required
              </p>
            )}
            {snapshot && (
              <div>
                {/*  {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>} */}
                <ProgressBar
                  labelColor="#e80909"
                  animateOnRender
                  completed={Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  )}
                />
              </div>
            )}
            <div className="text-center my-5">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateParking;
