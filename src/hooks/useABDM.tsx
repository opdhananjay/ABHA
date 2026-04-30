import { useContext, useState } from "react";
import { LoaderContext } from "../context/LoaderProvider";
import { CreateCutomAbhaIDService, GetPatinetService, GetSuggestedAbhaService, RegisterByAadharService, ResendAadharOTPService, SearchByAbhaAddressService, SendPhoneOTPService, ValidateAadharOTPService, ValidateAbhaByOTPPhoneService, ValidateAbhaByPhoneService, ValidateAbhaIDByAadharOTPService, ValidateAbhaIDByAadharService, ValidatePhoneOTPService } from "../services/abdm.service";
import { data } from "react-router-dom";

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


  // Mobile Section Stats 
  
  const sendPhoneOtp = async (data:any) => {
    try{
      setLoading(true);
      setError(null);

      const res = await SendPhoneOTPService(data);
      return res.data;
    }  
    catch(err:any){
      setError(err?.response?.data?.message || "Failed to send OTP");
      return null;

    } finally {
      setLoading(false);
    }
  }

  const verifyPhoneOtp = async (data:any) => {
     try{
       setLoading(true);
       setError(null);
        
       const res = await ValidatePhoneOTPService(data);
       return res.data;
     } 
     catch(err:any){
        setError(err?.response?.data?.message || "Invalid OTP");
        return null;
     }
     finally{
      setLoading(false);
     }
  }
  
  // Mobile Section Ends 

  // Get Suggested Abha 

  const getSuggestedAbhaIds = async (data:any) => {
     try{
       setLoading(true);
       setError(null);
        
       const res = await GetSuggestedAbhaService(data);
       return res.data;
     } 
     catch(err:any){
        setError(err?.response?.data?.message || "Failed to fetch abha");
        return null;
     }
     finally{
      setLoading(false);
     }
  }

  const checkAbhaIdAvailable = async (data:any) => {
     try{
       setLoading(true);
       setError(null);
        
       const res = await SearchByAbhaAddressService(data);
       return res.data;
     } 
     catch(err:any){
        setError(err?.response?.data?.message || "Failed to search abha");
        return null;
     }
     finally{
      setLoading(false);
     }
  }

  const createCustomAbhaId = async (data:any) => {
     try{
       setLoading(true);
       setError(null);
        
       const res = await CreateCutomAbhaIDService(data);
       return res.data;
     } 
     catch(err:any){
        setError(err?.response?.data?.message || "Failed to Create abha");
        return null;
     }
     finally{
      setLoading(false);
     }
  }


  // Get Suggested Abha 


  // Search Patinet 
  const getPatient = async (searchText:string) => {
    try{
       setError(null);
       const res = await GetPatinetService(searchText);
       return res.data;
    }
    catch(err:any){
        setError(err?.response?.data?.message || "Failed to Create abha");
        return null;
    }
    finally{

    }
  }


  // Abha Verification Starts 
  
  const sendOTPAbhaIdByAadhar = async (data:any) => {
    try{
      setLoading(true);
      setError(null);
      const res = await ValidateAbhaIDByAadharService(data);
      return res.data;
    }
    catch(err:any){
      setError(err?.response?.data?.message || "Failed to Send OTP");
      return null;
    }
    finally{
      setLoading(false);
    }
  }

  const verifyOTPAbhaIdAadharOTP = async (data:any) => {
    try{
      setLoading(true);
      setError(null);
      const res = await ValidateAbhaIDByAadharOTPService(data);
      return res.data;
    }
    catch(err:any){
      setError(err?.response?.data?.message || "Failed to Verify OTP");
      return null;
    }
    finally{
      setLoading(false);
    }
  }

  const sendOTPByPhone = async (data:any) => {
    try{
      setLoading(true);
      setError(null);
      const res = await ValidateAbhaByPhoneService(data);
      return res.data;
    }
    catch(err:any){
      setError(err?.response?.data?.message || "Failed to Send Phone OTP");
      return null;
    }
    finally{
      setLoading(false);
    }
  }

  const verifyPhoneOTP = async (data:any) => {
    try{
      setLoading(false);
      setError(null);
      const res = await ValidateAbhaByOTPPhoneService(data);
      return res.data;
    }
    catch(err:any){
      setError(err?.response?.data?.message || "Failed to Send Phone OTP");
      return null;
    }
    finally{
      setLoading(false);
    }
  }

  // Abha Verification Ends 




  return {
    sendAadharOtp,
    verifyAadharOtp,
    resendAadharOtp,

    sendPhoneOtp,
    verifyPhoneOtp,

    getSuggestedAbhaIds,
    checkAbhaIdAvailable,
    createCustomAbhaId,

    sendOTPAbhaIdByAadhar,
    verifyOTPAbhaIdAadharOTP,
    sendOTPByPhone,
    verifyPhoneOTP,

    getPatient,

    error
  };
};

export default useABDM;