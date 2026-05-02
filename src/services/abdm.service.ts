import apiClient from "./apiClient"

export const RegisterByAadharService = (data:any) => {
    return apiClient.post('/ABDM/RegisterAadhaar',data);
}

export const ValidateAadharOTPService = (data:any) => {
    return apiClient.post('/ABDM/ValidateAadhaarOTP',data);
}

export const ResendAadharOTPService = (data:any) => {
    return apiClient.post('/ABDM/ResentOTPAadhaar',data);
}


// Mobile Section 

export const SendPhoneOTPService = (data:any) => {
    return apiClient.post('/ABDM/VerifyPhone',data);
}

export const ValidatePhoneOTPService = (data:any) => {
    return apiClient.post('/ABDM/ValidatePhoneOTP',data);
}

// Mobile Section 

// Abha Section 

export const GetSuggestedAbhaService = (data:any) => {
    return apiClient.post('/ABDM/GetABHAIDSuggestions',data);
}

export const SearchByAbhaAddressService = (data:any) => {
    return apiClient.post('/ABDM/SearchAbhaByAddress',data);
}

export const CreateCutomAbhaIDService = (data:any) => {
    return apiClient.post('/ABDM/CreateCustomeABHAID',data);
}

// Abha Section 


// Search Patient 

export const GetPatinetService = (searchText:string) => {
    return apiClient.post(`ABDM/GetPatient?searchText=${searchText}`)
}


// abha Verification Starts 

export const ValidateAbhaIDByAadharService = (data:any) => {
    return apiClient.post('/ABDM/ValidateAbhaByAadhar',data);
}

export const ValidateAbhaIDByAadharOTPService = (data:any) => {
    return apiClient.post('/ABDM/ValidateAbhaByAadharOTP',data);
}


export const ValidateAbhaByPhoneService = (data:any) => {
    return apiClient.post('/ABDM/ValidateAbhaByPhone',data);
}

export const ValidateAbhaByOTPPhoneService = (data:any) => {
    return apiClient.post('/ABDM/ValidateAbhaByPhoneOtp',data);
}


// Abha Verification Ends 


// UHID Linking 

export const GetPatientByMrnoService = (mrNo:string) => {
    return apiClient.post(`/ABDM/GetPatientByMrNo?mrNo${mrNo}`)
}

export const SavePatientService = (data:any) => {
    return apiClient.post('/ABDM/save-patient',data);
}

