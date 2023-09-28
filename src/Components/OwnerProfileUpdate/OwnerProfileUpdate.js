import React, { useContext, useState } from "react";
import OwnerProfileDashboard from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import { useForm } from "react-hook-form";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import axios from "axios";
import userFetch from "../utils/Hooks/userFetch";

const OwnerProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { id, email } = useContext(LoginRegisterContext);
  const { name, setName } = userFetch(id);
  console.log(name);
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .put("/api/v1/user/ownerprofile", {
        ...data,
        id,
      })
      .then((res) => console.log(res));
  };
  console.log(id);
  return (
    <div>
      <OwnerProfileDashboardHeader></OwnerProfileDashboardHeader>
      <div className="form-update flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            defaultValue={name}
            {...register("name")}
            className="mb-5 w-80 border border-black p-3 mt-5"
          />
          <br />
          {/* include validation with required or other standard HTML validation rules */}
          <input
            defaultValue={email}
            {...register("email", { required: true })}
            className="mb-5 w-80 border border-black p-3"
          />
          <br />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <input type="submit" className="mb-5 w-80 border border-black p-3" />
        </form>
      </div>
    </div>
  );
};

export default OwnerProfileUpdate;
