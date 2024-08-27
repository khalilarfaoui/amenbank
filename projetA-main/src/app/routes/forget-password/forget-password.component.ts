import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgotPasswordRequest = {
    email: ''
  };
  message: string | null = null;
  showMessage = false
  showMessageError = false

  constructor(
    private router: Router,
    private authService : AuthService

  ) {}

  onForgotPassword(): void {
    if (this.forgotPasswordRequest.email) {
      this.authService.resetPassword(this.forgotPasswordRequest.email)
        .subscribe({
          next: (response: any) => {
            this.message = 'Un lien de réinitialisation a été envoyé à votre adresse e-mail.';
            this.showMessage = true
            this.showMessageError = false
          },
          error: (error) => {
            this.message = "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer.";
            this.showMessage = false
            this.showMessageError = true
          }
        });
    } else {
      this.message = 'Veuillez entrer une adresse e-mail valide.';
      this.showMessage = false
      this.showMessageError = true
    }
  }

}
