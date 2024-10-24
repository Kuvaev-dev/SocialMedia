import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "../utils";
import { useParams } from "react-router-dom";
import { Loading } from "../components";

const ChangePassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });

  const handleChangePasswordSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");
    setSuccessMsg("");

    try {
      const res = await apiRequest({
        url: "/reset-password",
        data: {
          userId,
          token,
          password: data.newPassword,
        },
        method: "POST",
      });

      if (res.status === 200) {
        setSuccessMsg("Password changed successfully.");
      } else {
        setErrMsg(res.message || "An error occurred.");
      }
    } catch (error) {
      setErrMsg("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <h1 className="text-ascent-1 text-lg font-semibold">Change Password</h1>
        <form
          onSubmit={handleSubmit(handleChangePasswordSubmit)}
          className="py-4 flex flex-col gap-5"
        >
          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-lg p-2 border border-gray-300"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg p-2 border border-gray-300"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          {isSubmitting ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-[#469c40] px-8 py-3 text-sm font-medium text-white outline-none"
            >
              Change Password
            </button>
          )}
          {errMsg && <p className="text-red-500">{errMsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
