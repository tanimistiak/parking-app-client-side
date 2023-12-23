import React, { useContext, useEffect, useState } from "react";
import OwnerProfileDashboard from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import { useForm } from "react-hook-form";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import axios from "axios";
import userFetch from "../utils/Hooks/userFetch";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";
import publicUserFetch from "../utils/Hooks/publicUserFetch";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const UserProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [user] = useAuthState(auth);
  const { email } = user;

  const [name, setName] = useState();

  const [track, setTrack] = useState(false);

  const onSubmit = async (data) => {
    if (data.name) {
      await axios
        .put("/api/v1/user/userprofile", {
          ...data,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            toast("Successfully updated owner");
            setTrack(!track);
          } else {
            toast("Could not update");
          }
        });
    }
  };
  useEffect(() => {
    const userFetch = async () => {
      await axios
        .get(`/api/v1/user/all-users/${email}`)
        .then((res) => {
          console.log(res.data[0]);
          if (res.data[0].name) {
            setName(res.data[0].name);
          } else {
            setName("");
          }
        })
        .catch((err) => console.log(err));
    };
    userFetch();
  }, [track, email]);

  return (
    <div className="bg-gray-200">
      <UserProfileDashboardHeader></UserProfileDashboardHeader>
      <div className="form-update flex justify-center py-5 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4"
        >
          <h2 class="text-2xl font-bold mb-4 text-center">
            Update User profile
          </h2>
          <div className="flex flex-col">
            <label for="name" class="text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              defaultValue={name}
              {...register("name")}
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col">
            <label for="email" className="text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input
              defaultValue={email}
              {...register("email", { required: true })}
              id="email"
              readOnly
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <input
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 hover:cursor-pointer"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfileUpdate;
