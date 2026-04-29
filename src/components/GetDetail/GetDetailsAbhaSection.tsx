import { useState } from "react";
import { UserCircle2, CircleChevronLeft, Lock } from "lucide-react";

type Props = {
  onComplete?: (data: any) => void;
};

const GetDetailsAbhaSection = ({ onComplete }: Props) => {

  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [abhaUser, setAbhaUser] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleAbhaInput = (input: string) => {
    const cleaned = input.replace(/@abha/gi, "");
    setAbhaUser(cleaned);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const next = document.getElementById(`otp-${index + 1}`);
    if (value && next) (next as HTMLInputElement).focus();
  };

  const handleSendOtp = () => {
    if (!abhaUser) return;

    // 👉 call API here later
    setStep("OTP");
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;

    // 👉 call verify API here later

    setStep("DONE");

    onComplete?.({
      abhaAddress: `${abhaUser}@abha`,
    });
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
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
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
            OTP sent to ABHA Address{" "}
            <span className="font-medium text-gray-800">
              {abhaUser}@abha
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

          <button
            disabled={otp.join("").length !== 6}
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
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

export default GetDetailsAbhaSection;