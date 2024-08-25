import { Component } from '@angular/core';
import { AuthenticationRequest } from "../../models/authentication-request";
import { AuthenticationResponse } from "../../models/authentication-response";
import { Router } from "@angular/router";
import { VerificationRequest } from "../../models/verification-request";
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {
    email: '',
    password: '',
  };
  otpCode: string = '';
  authResponse: AuthenticationResponse = {};

  // Ajout de la propriété 'message' pour afficher des messages de succès ou d'erreur
  message: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  authenticate() {
    this.authRequest.email = this.authRequest.email;
    console.log(this.authRequest);

    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          console.log(response);

          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
            this.authService.setBooleanValue(true)
            this.router.navigateByUrl('/comptes');
          }
        },
        error: (error) => {
          console.error("Erreur lors de l'authentification", error);
          this.message = "Erreur lors de l'authentification";
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.authService.setBooleanValue(true)
          this.router.navigateByUrl('/comptes');
        },
        error: (error) => {
          console.error("Erreur lors de la vérification du code", error);
          this.message = "Erreur lors de la vérification du code";
        }
      });
  }

  onSubmit() {
    this.authenticate();
  }
}
