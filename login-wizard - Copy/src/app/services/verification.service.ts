import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistrationRequest {
  mobileNumber: string;
  email: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  verificationCode: number;
}

export interface VerificationRequest {
  code: string;
}

export interface VerificationResponse {
  message: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'http://localhost:8080/api/verification';

  constructor(private http: HttpClient) {}

  register(data: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/register`, data, {
      withCredentials: true
    });
  }

  verify(code: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/verify`, { code }, {
      withCredentials: true
    });
  }

  resendMobile(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/resend-mobile`, {}, {
      withCredentials: true
    });
  }

  resendEmail(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/resend-email`, {}, {
      withCredentials: true
    });
  }

  switchToEmail(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/switch-to-email`, {}, {
      withCredentials: true
    });
  }

  switchToMobile(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/switch-to-mobile`, {}, {
      withCredentials: true
    });
  }
}