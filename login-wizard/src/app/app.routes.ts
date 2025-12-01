import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VerifyMobileComponent } from './components/verify-mobile/verify-mobile.component';
import { SuccessComponent } from './components/success/success.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'verify-mobile', component: VerifyMobileComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'success', component: SuccessComponent },
];