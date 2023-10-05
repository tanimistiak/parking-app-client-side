import React, { useContext, useState } from "react";
import OwnerProfileDashboard from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import { useForm } from "react-hook-form";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import axios from "axios";
import userFetch from "../utils/Hooks/userFetch";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import publicUserFetch from "../utils/Hooks/publicUserFetch";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";

const UserProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { id, email } = useContext(UserLoginRegisterContext);
  const { name, setName } = publicUserFetch(id);
  console.log(name);
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .put("/api/v1/publicUsers/userprofile", {
        ...data,
        id,
      })
      .then((res) => console.log(res));
  };
  console.log(id);
  return (
    <div>
      <UserProfileDashboardHeader></UserProfileDashboardHeader>
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

export default UserProfileUpdate;
