import { useState, useEffect } from "react";
import { Smartphone, Lock, CircleChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import useABDM from "../../hooks/useABDM";

type Props = {
  onComplete?: (data: any) => void;
};

const ValidateMobileSection = ({ onComplete }: Props) => {

  const { sendOTPByPhone, verifyPhoneOTP, error } = useABDM();

  const [txnId, setTxnId] = useState("");

  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // 🔥 Mask mobile
  const maskedMobile = mobile
    ? `XXXXXX${mobile.slice(-4)}`
    : "";

  // 🔥 Timer logic (clean)
  useEffect(() => {
    if (step !== "OTP") return;

    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // 🔥 OTP change
  const handleOtpChange = (val: string, index: number) => {
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // 🔥 Send OTP
  const handleSendOtp = async () => {

    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    const response = await sendOTPByPhone({
      phoneNumber: mobile.trim()
    });

    if (!response || !response.success) {
      toast.error(error || "Failed to send OTP");
      return;
    }

    try {
      const parsed = JSON.parse(response.data);

      if (parsed.success) {

        setTxnId(parsed.transactionID);

        setStep("OTP");
        setOtp(Array(6).fill(""));
        setTimer(60);
        setCanResend(false);

        toast.success(parsed.message || "OTP sent successfully");

      } else {
        toast.error(parsed.message || "Failed to send OTP");
      }

    } catch (err) {
      console.error("OTP Parse Error", err);
      toast.error("Something went wrong");
    }
  };

  // 🔥 Verify OTP
  const handleVerifyOtp = async () => {

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    const response = await verifyPhoneOTP({
      otp: enteredOtp,
      txnId
    });

    if (!response || !response.success) {
      toast.error(error || "OTP verification failed");
      return;
    }

    try {
      const parsed = JSON.parse(response.data);

      if (parsed.success) {

        toast.success(parsed.message || "Verified successfully");

        setStep("DONE");

        onComplete?.({
          parsed,
          mobile,
          txnId
        });

      } else {
        toast.error(parsed.message || "Invalid OTP");
      }

    } catch (err) {
      console.error("Verify Error", err);
      toast.error("Something went wrong");
    }
  };

  // 🔥 Resend
  const handleResendOTP = () => {
    if (!canResend) return;
    handleSendOtp();
  };

  return (
    <div className="space-y-5">

      {/* STEP 1 */}
      {step === "INPUT" && (
        <>
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Smartphone size={14} />
              Mobile Number
            </label>

            <div className="flex border rounded-md overflow-hidden">
              <span className="px-3 bg-gray-100 text-sm flex items-center">
                +91
              </span>
              <input
                value={mobile}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  if (onlyNums.length <= 10) setMobile(onlyNums);
                }}
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 outline-none text-sm"
              />
            </div>
          </div>

          <button
            disabled={mobile.length !== 10}
            onClick={handleSendOtp}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 cursor-pointer"
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
              {maskedMobile}
            </span>
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Lock size={14} />
              Enter OTP
            </label>

            <div className="flex gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
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
                onClick={handleResendOTP}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            disabled={otp.join("").length !== 6}
            onClick={handleVerifyOtp}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 cursor-pointer"
          >
            Verify & Continue
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === "DONE" && (
        <div className="text-green-600 text-sm font-medium">
          Mobile Verified ✅
        </div>
      )}

    </div>
  );
};

export default ValidateMobileSection;