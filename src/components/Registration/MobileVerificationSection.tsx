import { CircleChevronLeft, Smartphone, Lock } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  onComplete?: () => void;
};

const MobileVerificationSection = ({ onComplete }: Props) => {

  const [mobileMode, setMobileMode] = useState<"EXISTING" | "NEW">("EXISTING");
  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [maskedMobile] = useState("XXXXX3690");
  const [mobile, setMobile] = useState("");

  const [otpMobile, setOtpMobile] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpMobile];
    newOtp[index] = value;
    setOtpMobile(newOtp);

    const next = document.getElementById(`mobile-otp-${index + 1}`);
    if (value && next) (next as HTMLInputElement).focus();
  };

  const handleVerify = () => {
    setStep("DONE");
    onComplete?.();
  };

  useEffect(() => {
    if (step !== "OTP") return;

    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  return (
    <div className="bg-white rounded-md p-1 space-y-5">

      {/* STEP 1 */}
      {step === "INPUT" && (
        <>
          {/* Mobile Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={mobileMode === "EXISTING"}
                onChange={() => setMobileMode("EXISTING")}
                className="accent-blue-600"
              />
              <span className="text-sm">
                Use Aadhaar Mobile{" "}
                <span className="font-medium text-gray-800">
                  {maskedMobile}
                </span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={mobileMode === "NEW"}
                onChange={() => setMobileMode("NEW")}
                className="accent-blue-600"
              />
              <span className="text-sm">Use Different Mobile</span>
            </label>
          </div>

          {/* Mobile Input */}
          {mobileMode === "NEW" && (
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Smartphone size={14} />
                Mobile Number
              </label>

              <div className="flex">
                <div className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-gray-600 text-sm">
                  +91
                </div>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full border rounded-r-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                  maxLength={10}
                />
              </div>
            </div>
          )}

          {/* Send OTP */}
          <button disabled={mobile.length !== 10 && mobileMode === "NEW"}
            onClick={() => {
              setStep("OTP");
              setTimer(30);
              setCanResend(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Send OTP
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === "OTP" && (
        <>
          {/* Back */}
          <div
            onClick={() => setStep("INPUT")}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <CircleChevronLeft size={18} />
            Back
          </div>

          {/* Info */}
          <div className="text-sm text-gray-600">
            OTP sent to mobile{" "}
            <span className="font-medium text-gray-800">
              {mobileMode === "EXISTING" ? maskedMobile : mobile}
            </span>
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Lock size={14} />
              Enter OTP
            </label>

            <div className="flex gap-2">
              {otpMobile.map((digit, i) => (
                <input
                  key={i}
                  id={`mobile-otp-${i}`}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, i)
                  }
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded-md focus:ring-2 focus:ring-blue-600"
                />
              ))}
            </div>
          </div>

          {/* Resend */}
          <div className="text-sm text-gray-500">
            {!canResend ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <button
                onClick={() => {
                  setTimer(30);
                  setCanResend(false);
                  setOtpMobile(Array(6).fill(""));
                }}
                className="text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify */}
          <button disabled={otpMobile.length != 6}
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md"
          >
            Verify & Continue
          </button>
        </>
      )}
    </div>
  );
};

export default MobileVerificationSection;