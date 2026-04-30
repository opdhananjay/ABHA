import { useState, useEffect } from "react";
import { UserCircle2, CircleChevronLeft, Lock } from "lucide-react";
import toast from "react-hot-toast";
import useABDM from "../../hooks/useABDM";

type Props = {
  onComplete?: (data: any) => void;
};

const ValidateAbhaSection = ({ onComplete }: Props) => {

  const { sendOTPAbhaIdByAadhar, verifyOTPAbhaIdAadharOTP, error } = useABDM();

  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [txnId, setTxnId] = useState("");

  const [abhaUser, setAbhaUser] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const abhaAddress = `${abhaUser}`;

  //  Mask ABHA
  const maskedAbha = abhaUser
    ? `${abhaUser.slice(0, 2)}****@abha`
    : "";

  // Timer
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

  //  Input handler
  const handleAbhaInput = (input: string) => {
    const cleaned = input.replace(/@abha/gi, "").trim();
    setAbhaUser(cleaned);
  };

  //  OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  //  Send OTP
  const handleSendOtp = async () => {

    if (!abhaUser) {
      toast.error("Enter ABHA username");
      return;
    }

    const response = await sendOTPAbhaIdByAadhar({
      abhaAddress
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
      console.error("Send OTP Error", err);
      toast.error("Something went wrong");
    }
  };

  // 🔥 Verify OTP
  const handleVerify = async () => {

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    const response = await verifyOTPAbhaIdAadharOTP({
      otp: finalOtp,
      txnId
    });

    if (!response || !response.success) {
      toast.error(error || "Verification failed");
      return;
    }

    try {
      const parsed = JSON.parse(response.data);

      if (parsed.success) {

        toast.success(parsed.message || "Verified successfully");

        setStep("DONE");

        onComplete?.({
          parsed,
          abhaAddress,
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
  const handleResend = () => {
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
              <UserCircle2 size={14} />
              ABHA Address
            </label>

            <div className="flex border rounded-md overflow-hidden">
              <input
                type="text"
                value={abhaUser}
                onChange={(e) => handleAbhaInput(e.target.value)}
                placeholder="Enter ABHA username"
                className="w-full px-3 py-2 text-sm outline-none"
              />
              <span className="px-3 bg-gray-100 text-sm flex items-center text-gray-600">
                @abha
              </span>
            </div>
          </div>

          <button
            disabled={!abhaUser}
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
            OTP sent to{" "}
            <span className="font-medium text-gray-800">
              {maskedAbha}
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
                  onChange={(e) => handleOtpChange(e.target.value, i)}
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
                onClick={handleResend}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            disabled={otp.join("").length !== 6}
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 cursor-pointer"
          >
            Verify & Continue
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === "DONE" && (
        <div className="text-green-600 text-sm font-medium">
          ABHA Verified ✅
        </div>
      )}

    </div>
  );
};

export default ValidateAbhaSection;