import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  verificationForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  emailAddress = 'youremail@emaildomain.com';

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit() {
    // You could fetch the email from session or pass via route state
    // this.emailAddress = 'user@example.com';
  }

  get f() {
    return this.verificationForm.controls;
  }

  goBack() {
    this.router.navigate(['/verify-mobile']);
  }

  onSubmit() {
    this.submitted = true;

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

  sendViaMobile() {
    this.verificationService.switchToMobile().subscribe({
      next: (response) => {
        alert(`Code sent to mobile! Code: ${response.verificationCode}`);
        this.router.navigate(['/verify-mobile']);
      },
      error: (error) => {
        console.error('Failed to switch to mobile:', error);
      }
    });
  }
}