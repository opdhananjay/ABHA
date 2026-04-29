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