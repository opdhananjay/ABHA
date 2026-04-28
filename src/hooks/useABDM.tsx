import { useContext, useState } from "react";
import { LoaderContext } from "../context/LoaderProvider";
import { RegisterByAadharService, ResendAadharOTPService, ValidateAadharOTPService } from "../services/abdm.service";

const useABDM = () => {

  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useABDM must be used within LoaderProvider");
  }

  const { setLoading } = context;
  const [error, setError] = useState<string | null>(null);

  // 🔹 Send OTP
  const sendAadharOtp = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const res = await RegisterByAadharService(data);
      return res.data;

    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
      return null;

    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP
  const verifyAadharOtp = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const res = await ValidateAadharOTPService(data);
      return res.data;

    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP");
      return null;

    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend OTP
  const resendAadharOtp = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const res = await ResendAadharOTPService(data);
      return res.data;

    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to resend OTP");
      return null;

    } finally {
      setLoading(false);
    }
  };

  return {
    sendAadharOtp,
    verifyAadharOtp,
    resendAadharOtp,
    error
  };
};

export default useABDM;