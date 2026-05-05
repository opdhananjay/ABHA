import { useEffect, useState } from "react";
import {
  CreditCard,
  Lock,
  CircleChevronLeft,
  Smartphone,
} from "lucide-react";
import useABDM from "../../hooks/useABDM";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

type Props = {
  onComplete?: (data:any,transactionId:string,mobile:string,aadhar:string) => void;
};

const AadharSection = ({ onComplete }: Props) => {

  const navigate = useNavigate();

  const { sendAadharOtp, verifyAadharOtp, resendAadharOtp, checkAbhaExistHMIS, error } = useABDM();

  const [showModal,setShowModal] = useState<any>({
    abhalink:false,
    abhacard:false
  });  // For Opening Confirmation Modal
  


  const [step, setStep] = useState<"INPUT" | "OTP" | "DONE">("INPUT");

  const [aadhar, setAadhar] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [otpAadhar, setOtpAadhar] = useState(Array(6).fill(""));

  const [maskedMobile, setMaskedMobile] = useState("XXXXX3690");

  const [timer,setTimer] = useState(30);
  const [canResend,setCanResend] = useState(false);

  const [txnId, setTxnId] = useState(""); // Store transaction ID for OTP verification and resending
  const [mobile, setMobile] = useState("");


  const [abhaAddress,setAbhaAddress] = useState("");
  const [abhaNumber,setAbhaNumber] = useState("");

  const [abhaParsedData,setAbhaParsedData] = useState<any>({});

  // Aadhaar format
  const formatAadhar = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhar(formatAadhar(e.target.value));
  };

  // OTP handler (cleaned: only aadhaar now)
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpAadhar];
    newOtp[index] = value;
    setOtpAadhar(newOtp);

    const next = document.getElementById(`aadhaar-otp-${index + 1}`);
    if (value && next) (next as HTMLInputElement).focus();
  };


  const validateVerifyButton = () => {
    
    if(otpAadhar.some(d => d === "")) {
      toast.error("Please enter the complete OTP.");
      return false;
    };

    if(mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    };

    return true;
  }


  const handleVerify = async () => {

    if(!validateVerifyButton()) return;

    const dataToSend = {
      otp: otpAadhar.join(""),
      txnId: txnId,
      mobile: mobile
    }

    // setAbhaAddress("addres");
    // setShowModal((prev:any)=>({
    //   ...prev,
    //   abhalink:true,
    // }));
    //onComplete?.({firstName:'boom', data: dataToSend});
    //setStep("DONE");  

    const response = await verifyAadharOtp(dataToSend);

    if(!response || !response.success){
      toast.error(error || "OTP verification failed. Please try again.");
      return;
    }

    try{

      const parsed = JSON.parse(response.data);

      if(parsed.success){
        
        toast.success("Aadhaar verified successfully!");
        
        // Cheking Abha Existing in System 
        const abhaAddress = parsed.abhaAddress;
        const abhaNumber = parsed.abhaNumber;
        const normalizedMessage = parsed.message?.trim()?.toLowerCase();

        if(abhaAddress && abhaNumber){ 
          
          try{
            
            const dataToExistingRes = {
                abhaAddress,
                abhaNumber
            }

            const existingResponse = await checkAbhaExistHMIS(dataToExistingRes);
            
            // ABHA Alredy Exists && Alredy Link With HMIS - Show Abha Card 
            if(normalizedMessage === "this account already exist" && existingResponse && existingResponse?.success){
                
                setAbhaAddress(abhaAddress);

                setAbhaNumber(abhaNumber);
                
                setShowModal((prev:any)=>({
                  ...prev,
                  abhacard:true
                }));

                return;
            }

            // ABHA Alredy Exists && NOT Linked With HMIS - Countine for Linking 
            if(normalizedMessage === "this account already exist" && existingResponse && !existingResponse?.success){

                setAbhaParsedData(parsed);

                setShowModal((prev:any)=>({
                  ...prev,
                  abhalink:true
                }));

                return;
            }

          }
          catch(err:any){
            toast.error("ABHA existence check failed");
            return;
          }  
        }

        setStep("DONE");

        onComplete?.(parsed,txnId,mobile,aadhar);
      } 
      else{
        toast.error(parsed.message || "OTP verification failed. Please try again.");
      }

    }
    catch(err){
      console.error("OTP Verification Error", err);
    }
  };

  // Send OTP Service Call - 
  const handleSendAadharOtp = async () => {
      
      const dataToSend = {
        aadharNumber: aadhar.replace(/\s/g, "")
      };

      setStep("OTP");
      setOtpAadhar(Array(6).fill(""));

      const response = await sendAadharOtp(dataToSend);

      if(!response || !response.success){
        toast.error(error || "Failed to send OTP. Please try again.");
        return;
      }

      try{
        
        const parsed = JSON.parse(response.data);

        if(parsed.success){
            
          const txnId = parsed.transactionID;

          setTxnId(txnId);
          
          const message = parsed.message;

          const lastDigits = message.match(/(\d{4})$/)?.[0] || "XXXX";

          setMaskedMobile(`XXXXX${lastDigits}`);

          setStep("OTP");

          setTimer(60);

          setCanResend(false);

          toast.success("OTP sent successfully to your registered mobile number.");
        }
        else{
           toast.error(parsed.message || "Failed to send OTP. Please try again.");
        }

      }
      catch(err){
        console.error("OTP Error", err);
      }
  }

  // Validate and Resend OTP Service Call -
  const validateResend = () => {

    if(timer > 0) {
      toast.error(`Please wait for ${timer}s before resending OTP.`);
      return false;
    }

    if(txnId === "") {
      toast.error("No transaction found. Please initiate OTP request again.");
      return false;
    }

    return true; 
  }


  // Resend OTP Service Call
  const handleResendAadharOtp = async () => {

    if(!validateResend()) return;

    setOtpAadhar(Array(6).fill(""));

    const dataToSend = {
      txnId: txnId,
      aadharNumber: aadhar.replace(/\s/g, ""),
    }

    const response = await resendAadharOtp(dataToSend);

    if(!response || !response.success){
      toast.error(error || "Failed to resend OTP. Please try again.");
      return;
    }

    try{
      const parsed = JSON.parse(response.data);

      if(parsed.success){

        const txnId = parsed.transactionID;

        setTxnId(txnId);

        setTimer(60);

        setCanResend(false);

        toast.success("OTP resent successfully to your registered mobile number.");
      }
      else{
        toast.error(parsed.message || "Failed to resend OTP. Please try again.");
        return;
      }

    }
    catch(err){
      console.error("Resend OTP Error", err);
    }

   
  }

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
 

  // ABHA already exists. Continue linking with HMIS.
  const handleAbhaLinkConfirmation = () => {

    setShowModal((prev:any)=>({
        ...prev,
        abhalink: false
    }));

    console.log('abha link redirecting',abhaParsedData);
     
    navigate("/linkabhaverification",{
      state:{
        parsedData:abhaParsedData,
        typeData:mobile,
        txnId,
        type:"mobile"
      }
    });

  }


  // Abha Card Confirmation 
  const handleAbhaCardConfirmation = (status:string) => {
    
    // Show Abha Card 
    if(status == "Yes"){
        navigate("/getabhacard", {
            state: {
              abhaNumber,
              transactionId: txnId
            }
        });
    }

    if(status == "No"){

    }

    setShowModal((prev: any) => ({
        ...prev,
        abhacard: false
    }));

  }


  return (
    <>
    <div className="bg-white rounded-md p-3">

      <div className="space-y-5">

        {/* STEP 1 */}
        {step === "INPUT" && (
          <>
            {/* Aadhaar Input */}
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <CreditCard size={14} />
                Enter Aadhaar Number
              </label>

              <input
                value={aadhar}
                onChange={handleAadharChange}
                placeholder="1234 5678 9012"
                className="w-full md:w-1/2 border rounded-md px-3 py-2 tracking-widest focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1"
              />
              I consent to the use of my Aadhaar for ABHA creation as per UIDAI guidelines.
            </label>

            {/* Continue Button (smaller & cleaner) */}
            <button
              disabled={aadhar.replace(/\s/g, "").length !== 12 || !accepted}
              onClick={() => {
                  handleSendAadharOtp();
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-blue-700 transition"
            >
            Send OTP
          </button>
          </>
        )}

        {/* STEP 2 */}
       {step === "OTP" && (
          <>
            {/* Back Button */}
            <div
              onClick={() => setStep("INPUT")}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <CircleChevronLeft size={18} />
              Back
            </div>

            {/* OTP Info Message */}
            <div className="text-sm text-gray-600">
              OTP sent to Aadhaar-linked mobile number{" "}
              <span className="font-medium text-gray-800">
                {maskedMobile}
              </span>
            </div>

            {/* OTP Input */}
            <div>
              <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <Lock size={14} />
                Enter Aadhaar OTP
              </label>

              <div className="flex gap-2">
                {otpAadhar.map((digit, i) => (
                  <input
                    key={i}
                    id={`aadhaar-otp-${i}`}
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

            {/* Resend OTP */}
            <div className="text-sm text-gray-500">

                {!canResend ? (
                  <span>Resend OTP in {timer}s</span>
                ) : (
                  <button
                    onClick={() => {
                      handleResendAadharOtp();
                    }}
                    className="text-blue-600 cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}

            </div>

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
                  onChange={(e) =>
                    setMobile(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  placeholder="Enter mobile number"
                  className="w-full border rounded-r-md px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
                  maxLength={10}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                This mobile number will be used for all future ABHA communications and notifications.
              </p>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md"
            >
              Verify & Continue
            </button>
          </>
        )}

      </div>
    </div>

    
     <ConfirmationModal
        isOpen={showModal.abhalink}
        title="Success"
        message="ABHA already exists. Continue linking with HMIS?"
        onConfirm={() => {
          handleAbhaLinkConfirmation();         
        }}
        confirmText="OK"
      />

      <ConfirmationModal
        isOpen={showModal.abhacard}
        title="ABHA Card"
        message="ABHA already exists & linked with HMIS. Do you want to view ABHA card?"
        onConfirm={() => {
          handleAbhaCardConfirmation("Yes");
        }}
        onCancel={() => {
          handleAbhaCardConfirmation("No");
        }}
        confirmText="Yes"
        cancelText="No"
      />

    </>
  );
};

export default AadharSection;