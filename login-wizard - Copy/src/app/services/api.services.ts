import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { 
  UserRegistration, 
  RegistrationResponse, 
  VerificationResponse, 
  VerificationCode 
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  register(mobileNumber: string, email: string): Observable<RegistrationResponse> {
    const body: UserRegistration = { mobileNumber, email };
    return this.http.post<RegistrationResponse>(
      `${this.apiUrl}/verification/register`,
      body,
      this.httpOptions
    );
  }

  verifyCode(code: number): Observable<VerificationResponse> {
    const body: VerificationCode = { code };
    return this.http.post<VerificationResponse>(
      `${this.apiUrl}/verification/verify`,
      body,
      this.httpOptions
    );
  }

  resendEmailCode(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${this.apiUrl}/verification/resend-email`,
      {},
      this.httpOptions
    );
  }

  resendMobileCode(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${this.apiUrl}/verification/resend-mobile`,
      {},
      this.httpOptions
    );
  }

  switchToMobile(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${this.apiUrl}/verification/switch-to-mobile`,
      {},
      this.httpOptions
    );
  }

  switchToEmail(): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${this.apiUrl}/verification/switch-to-email`,
      {},
      this.httpOptions
    );
  }
}