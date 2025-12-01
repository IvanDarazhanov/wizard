export interface UserRegistration {
  mobileNumber: string;
  email: string;
}

export interface VerificationCode {
  code: number;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  code?: number;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}