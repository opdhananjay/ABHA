import { useEffect, useState } from "react";
import type { IOTPVerificationProps } from "../types/general.types";

const OTPVerification = ({
    mode,
    mobileNumber,
    onClose,
    onSuccess
  }: IOTPVerificationProps) => {

  const isMobileFlow = mode === "mobile";

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [hasSentOtp, setHasSentOtp] = useState(false);

  // 🔹 Get correct mobile number
  const getMobile = () => {
    return mode === "aadhaar" ? mobileNumber : mobile;
  };

  // 🔹 Restore timer from sessionStorage
  useEffect(() => {
    const numberToUse = getMobile();
    if (!numberToUse) return;

    const key = `otp_expiry_${numberToUse}`;
    const expiry = sessionStorage.getItem(key);

    if (expiry) {
      const remaining = Math.floor((+expiry - Date.now()) / 1000);

      if (remaining > 0) {
        setTimer(remaining);
      } else {
        sessionStorage.removeItem(key);
      }
    }
  }, [mode, mobileNumber]);

  // 🔹 Auto-send OTP for Aadhaar (only if no active timer)
  useEffect(() => {
    if (mode === "aadhaar" && mobileNumber && !hasSentOtp) {
      const key = `otp_expiry_${mobileNumber}`;
      const expiry = sessionStorage.getItem(key);

      if (!expiry || +expiry < Date.now()) {
        handleSendOtp(mobileNumber);
        setHasSentOtp(true);
      }
    }
  }, [mode, mobileNumber, hasSentOtp]);

  // 🔹 Timer logic
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer > 0]);

  // 📲 Send OTP
  const handleSendOtp = async (mobileParam?: string) => {
    const numberToUse = (mobileParam || mobile)?.trim();

    if (!numberToUse || numberToUse.length !== 10) {
      console.log("Invalid mobile number");
      return;
    }

    try {
      setIsSendingOtp(true);

      console.log("Sending OTP to:", numberToUse);

      // 👉 API call here

      const expiry = Date.now() + 30000;
      const key = `otp_expiry_${numberToUse}`;
      sessionStorage.setItem(key, expiry.toString());

      setTimer(30);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = () => {
    if (timer !== 0) return;

    const numberToUse = getMobile();
    if (!numberToUse) return;

    handleSendOtp(numberToUse);
  };

  // ✅ Verify OTP
  const handleVerify = async () => {
    if (!otp) return;

    try {
      setIsVerifying(true);

      const numberToUse = getMobile();

      console.log("Verifying OTP:", otp);

      // 👉 verify API
      onSuccess(); // call success callback to inform parent component

      if (numberToUse) {
        const key = `otp_expiry_${numberToUse}`;
        sessionStorage.removeItem(key);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Mobile Input */}
      {isMobileFlow && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Mobile Number
          </label>

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
            placeholder="Enter mobile number"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            onClick={() => handleSendOtp(mobile)}
            disabled={isSendingOtp || timer > 0 || (!mobile && isMobileFlow)}
            className="px-2 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {isSendingOtp ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {/* Info */}
      {!isMobileFlow && mobileNumber && (
        <p className="text-sm text-gray-600">
          OTP sent to Aadhaar-linked mobile ******{mobileNumber.slice(-4)}
        </p>
      )}

      {/* OTP Input */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <label className="md:w-40 text-sm font-medium text-gray-700">
          Enter OTP
        </label>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          placeholder="Enter OTP"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Resend */}
      <div className="flex justify-end text-sm">
        {timer > 0 ? (
          <span className="text-gray-500">Resend OTP in {timer}s</span>
        ) : (
          <button
            onClick={handleResendOtp}
            className="text-green-600 hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleVerify}
          disabled={!otp || isVerifying}
          className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;