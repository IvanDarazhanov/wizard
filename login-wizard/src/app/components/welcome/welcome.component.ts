import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  
  constructor(private router: Router) {}

  createAccount(): void {
    console.log('Navigating to registration...');
    this.router.navigate(['/registration']);
  }

  login(): void {
    console.log('Navigating to login...');
    this.router.navigate(['/registration']);
  }
}