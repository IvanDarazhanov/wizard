import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-verify-mobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-mobile.component.html',
  styleUrl: './verify-mobile.component.css'
})
export class VerifyMobileComponent implements OnInit {
  verificationForm: FormGroup;
  submitted = false;
  phoneNumber = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private verificationService: VerificationService
  ) {
    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    // You could fetch the phone from session or pass via route state
    this.phoneNumber = '***masked***';
  }

  get f() {
    return this.verificationForm.controls;
  }

  goBack() {
    this.router.navigate(['/registration']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.verificationForm.invalid) {
      return;
    }

    this.verificationService.verify(this.verificationForm.value.code).subscribe({
      next: (response) => {
        this.router.navigate(['/verify-email']);
      },
      error: (error) => {
        console.error('Verification failed:', error);
        alert('Invalid verification code. Please try again.');
      }
    });
  }

  resendCode() {
    this.verificationService.resendMobile().subscribe({
      next: (response) => {
        alert(`Code resent! New code: ${response.verificationCode}`);
      },
      error: (error) => {
        console.error('Failed to resend code:', error);
      }
    });
  }

  sendViaEmail() {
    this.verificationService.switchToEmail().subscribe({
      next: (response) => {
        alert(`Code sent to email! Code: ${response.verificationCode}`);
        this.router.navigate(['/verify-email']);
      },
      error: (error) => {
        console.error('Failed to switch to email:', error);
      }
    });
  }
}