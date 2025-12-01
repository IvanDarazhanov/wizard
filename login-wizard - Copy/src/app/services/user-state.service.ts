import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserState {
  email: string;
  mobileNumber: string;
  verificationCode?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userStateSubject = new BehaviorSubject<UserState>({
    email: '',
    mobileNumber: '',
    verificationCode: undefined
  });

  public userState$: Observable<UserState> = this.userStateSubject.asObservable();

  setUserInfo(email: string, mobileNumber: string, code?: number): void {
    this.userStateSubject.next({ email, mobileNumber, verificationCode: code });
  }

  getUserState(): UserState {
    return this.userStateSubject.value;
  }

  getEmail(): string {
    return this.userStateSubject.value.email;
  }

  getMobileNumber(): string {
    return this.userStateSubject.value.mobileNumber;
  }

  getVerificationCode(): number | undefined {
    return this.userStateSubject.value.verificationCode;
  }

  clearState(): void {
    this.userStateSubject.next({
      email: '',
      mobileNumber: '',
      verificationCode: undefined
    });
  }
}