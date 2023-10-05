import React, { useContext, useEffect, useState } from "react";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import useIp from "../utils/Hooks/useIp";
import axios from "axios";
import { Controller, get, useForm } from "react-hook-form";
import LoginRegister from "../Login/LoginRegister";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import { fromLatLng, geocode, setKey } from "react-geocode";

const CreateParking = () => {
  let { ip, setIp } = useIp();
  const { email } = useContext(LoginRegisterContext);
  const [ipDetails, setIpDetails] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getIpDetails = async (ip) => {
      // console.log(ipDetails);
      ip = ip?.split(",")[0];
      if (ip) {
        await axios
          .get(`https://ipinfo.io/${ip}/json`)
          .then((res) => setIpDetails(res.data))
          .catch((err) => console.log(err))
          .finally(async () => {
            await setKey("AIzaSyBO8vP9zG-H0Cncs8Qucad9howK_CQyJf4");
            console.log(ipDetails);
            await fromLatLng(
              ipDetails?.loc?.split(",")[0],
              ipDetails?.loc?.split(",")[1]
            )
              .then(({ results }) => {
                console.log(
                  results,
                  ipDetails,
                  ipDetails?.loc?.split(",")[0],
                  ipDetails?.loc?.split(",")[1]
                );
                const { lat, lng } = results[0].geometry.location;
                // setAddress(address);
                console.log(lat, lng);
              })
              .catch((error) => {
                console.error("Error fetching address:", error);
              });
          });
      }
    };
    getIpDetails(ip);
  }, [ip]);
  useEffect(() => {}, [ip, address]);
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
        ip: ip,
        city: data.city,
        country: data.country,
        postCode: data.postCode,
        createdBy: email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <OwnerProfileDashboardHeader />
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
            defaultValue={ipDetails?.city}
            {...register("city", { required: true })}
          />{" "}
          <br />
          <input
            defaultValue={ipDetails?.country}
            className="w-80 border border-black mb-5 p-3"
            {...register("country", { required: true })}
          />
          <br />
          <input
            defaultValue={ipDetails?.loc}
            className="w-80 border border-black mb-5 p-3"
            {...register("parkingLocation", { required: true })}
          />
          <br />
          <input
            defaultValue={ipDetails?.postal}
            type="number"
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
          <input className="w-80 border border-black mb-5 p-3" type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateParking;
