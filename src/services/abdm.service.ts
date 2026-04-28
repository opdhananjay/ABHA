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
