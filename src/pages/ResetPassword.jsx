import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "../utils";
import { Loading, TextInput } from "../components";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleResetSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");

    try {
      const res = await apiRequest({
        url: "/users/request-passwordreset",
        data,
        method: "POST",
      });

      if (res.status !== 201) {
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
        <h1 className="text-ascent-1 text-lg font-semibold">Reset Password</h1>
        <form
          onSubmit={handleSubmit(handleResetSubmit)}
          className="py-4 flex flex-col gap-5"
        >
          <TextInput
            type="email"
            placeholder="Email"
            styles="w-full rounded-lg p-2 border border-gray-300 inline-flex"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {isSubmitting ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-[#469c40] px-8 py-3 text-sm font-medium text-white outline-none"
            >
              Submit
            </button>
          )}
          {errMsg && <p className="text-red-500">{errMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
