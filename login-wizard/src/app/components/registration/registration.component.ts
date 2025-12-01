import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private verificationService: VerificationService
  ) {
    this.registrationForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

    const requestData = {
      mobileNumber: this.registrationForm.value.mobile,
      email: this.registrationForm.value.email
    };

    this.verificationService.register(requestData).subscribe({
      next: (response) => {
        this.loading = false;
        
        // Show verification code (for development only - remove in production)
        alert(`Registration successful!\n\nVerification code: ${response.verificationCode}\n\n(In production, this would be sent via email/SMS)`);
        
        // Navigate to verify-mobile page <-- THIS IS WHERE IT GOES
        this.router.navigate(['/verify-mobile']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}