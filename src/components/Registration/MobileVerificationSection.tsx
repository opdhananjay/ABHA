import { CircleChevronLeft, Smartphone, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import useABDM from "../../hooks/useABDM";
import toast from "react-hot-toast";

type Props = {
  transactionId:string;
  aadhaarMobile?: string; 
  onComplete?: () => void;
};

const MobileVerificationSection = ({ transactionId, aadhaarMobile, onComplete }: Props) => {

  const { sendPhoneOtp, verifyPhoneOtp, error } = useABDM();

  const [txnId, setTxnId] = useState(transactionId || ""); // Store transaction ID for OTP verification and resending
  console.log(transactionId)
  const [mobileMode, setMobileMode] = useState<"EXISTING" | "NEW">(
    aadhaarMobile ? "EXISTING" : "NEW"
  );

  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [mobile, setMobile] = useState(aadhaarMobile || "");
  const [otpMobile, setOtpMobile] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // 🔹 Mask function
  const maskMobile = (num?: string) => {
    if (!num) return "";
    return "XXXXXX" + num.slice(-4);
  };

  // 🔹 OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpMobile];
    newOtp[index] = value;
    setOtpMobile(newOtp);

    const next = document.getElementById(`mobile-otp-${index + 1}`);
    if (value && next) (next as HTMLInputElement).focus();
  };

  // 🔹 Mobile validation
  const isValidMobile =
    mobileMode === "EXISTING"
      ? !!aadhaarMobile
      : mobile.length === 10;

  // 🔹 Verify
  const handleVerify = async () => {
    
    if (otpMobile.join("").length !== 6) {
      toast.error('Please enter the complete OTP.')
      return;
    };

    const dataToSend = {
      otp:otpMobile.join(''),
      txnId:txnId,
      mobile:mobile
    }

    const response = await verifyPhoneOtp(dataToSend);

    if(!response && !response.success){
      toast.error(error || "OTP verification failed. Please try again.");
      return;
    }

    try{
        
      const parsed = JSON.parse(response.data);

      console.log('Parsed Data Mobile Verification',parsed);

      toast.success("Mobile verified successfully!");
      
      setStep("DONE");
      
      onComplete?.();
    }
    catch(err:any){
      console.error("OTP Verification Error", err);
    }

  };

  const handleMobileSendOtp = async () => {

    const dataToSend = {
       txnId:txnId,
       phoneNumber:mobile
    }

    const response = await sendPhoneOtp(dataToSend)

    if(!response || !response.success){
      toast.error(error || "OTP verification failed. Please try again.");
      return;
    }

    try{
      
      const parsed = JSON.parse(response.data);

      if(parsed.success){

          const txnId = parsed.transactionID;

          setTxnId(txnId);

          setStep("OTP");
          
          setTimer(60);
          
          setCanResend(false);

          setOtpMobile(Array(6).fill(""));
      }
      else{
        toast.error(parsed.message || "Failed to send OTP. Please try again.");
      }
    }
    catch(err:any){
        console.error("OTP Error", err);
    }
  }

  // Handle Resend OTP 
  const handleResendPhoneOtp = async () => {
     handleMobileSendOtp();
  }

  // 🔹 Timer
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
          {/* ✅ Show only if Aadhaar mobile exists */}
          {aadhaarMobile && (
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
                    {maskMobile(aadhaarMobile)}
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
          )}

          {/* Mobile Input */}
          {(mobileMode === "NEW" || !aadhaarMobile) && (
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Smartphone size={14} />
                Mobile Number
              </label>

              {!aadhaarMobile && (
                <p className="text-xs text-gray-500 mb-1">
                  No mobile number found in Aadhaar. Please enter mobile number.
                </p>
              )}

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
          <button
            disabled={!isValidMobile}
            onClick={() => {
              handleMobileSendOtp()
            }}
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
            OTP sent to mobile{" "}
            <span className="font-medium text-gray-800">
              {mobileMode === "EXISTING"
                ? maskMobile(aadhaarMobile)
                : mobile}
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
                onClick={() => {
                  handleResendPhoneOtp()
                }}
                className="text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify */}
          <button
            disabled={otpMobile.join("").length !== 6}
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
          >
            Verify & Continue
          </button>
        </>
      )}
    </div>
  );
};

export default MobileVerificationSection;