import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-wrapper">
      <div class="container">
        <h1 class="title">Verify Your Email</h1>

        <div class="card">
          <h2>Enter Verification Code</h2>
          
          <form [formGroup]="verificationForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>VERIFICATION CODE</label>
              <input 
                type="text" 
                class="form-input"
                formControlName="code"
                placeholder="Enter 6-digit code"
                maxlength="6"
              />
              <div *ngIf="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
            </div>

            <button type="submit" class="primary-button" [disabled]="loading">
              {{ loading ? 'VERIFYING...' : 'VERIFY' }}
            </button>

            <button type="button" class="secondary-button" (click)="resendCode()" [disabled]="loading">
              RESEND CODE
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
    }
    .title {
      color: white;
      text-align: center;
      margin-bottom: 30px;
    }
    .card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }
    .form-input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 18px;
      text-align: center;
      letter-spacing: 5px;
    }
    .primary-button, .secondary-button {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 10px;
    }
    .primary-button {
      background: #7C3AED;
      color: white;
    }
    .primary-button:hover {
      background: #6D28D9;
    }
    .secondary-button {
      background: #f0f0f0;
      color: #333;
    }
    .error-message {
      color: #ef4444;
      margin-top: 8px;
      font-size: 14px;
    }
  `]
})
export class VerifyEmailComponent {
  verificationForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit() {
    if (this.verificationForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const code = this.verificationForm.value.code;  

    this.verificationService.verify(code).subscribe({
      next: (response) => {
        console.log('Verification successful:', response);
        this.loading = false;
        alert('Verification successful!');
        this.router.navigate(['/success']);
      },
      error: (error) => {
        console.error('Verification error:', error);
        this.loading = false;
        this.errorMessage = error.error?.message || 'Invalid or expired code';
      }
    });
  }

  resendCode() {
    this.loading = true;
    this.errorMessage = '';

    this.verificationService.resendEmail().subscribe({  
      next: (response) => {
        console.log('Code resent:', response);
        this.loading = false;
        alert(`New code sent! Code: ${response.verificationCode}`);  
      },
      error: (error) => {
        console.error('Resend error:', error);
        this.loading = false;
        this.errorMessage = 'Failed to resend code';
      }
    });
  }
}