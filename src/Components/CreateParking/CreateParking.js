import React, { useEffect, useState } from "react";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import useIp from "../utils/Hooks/useIp";
import axios from "axios";
import { get, useForm } from "react-hook-form";

const CreateParking = () => {
  const { ip, setIp } = useIp();
  const [ipDetails, setIpDetails] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  useEffect(() => {
    const getIpDetails = async (ip) => {
      console.log(ip);
      if (ip !== null) {
        await axios
          .get(`https://ipinfo.io/103.155.174.15/json`)
          .then((res) => setIpDetails(res.data))
          .catch((err) => console.log(err));
      }
    };
    getIpDetails(ip);
  }, [ip]);

  return (
    <>
      <OwnerProfileDashboardHeader />
      <div className="create-parking-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateParking;
