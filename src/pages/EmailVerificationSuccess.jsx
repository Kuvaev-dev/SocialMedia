import React from "react";
import { useLocation } from "react-router-dom";

const EmailVerificationSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailVerified = queryParams.get("verified");

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg text-center">
        <h1 className="text-ascent-1 text-lg font-semibold">
          Email Verification
        </h1>
        {emailVerified === "true" ? (
          <div>
            <h2 className="text-green-500">
              Your email has been successfully verified!
            </h2>
            <p>
              Thank you for verifying your email address. You can now log in to
              your account.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-red-500">Verification Failed</h2>
            <p>
              It seems that your email verification link is invalid or has
              expired. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
