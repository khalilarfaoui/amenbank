import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget',
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
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})

export class ForgetComponent {
  passwordChange = {

    newPassword: '',
    confirmPassword: ''
  };
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor() {}

  onChangePassword(): void {
    if (this.passwordChange.newPassword !== this.passwordChange.confirmPassword) {
      this.messageType = 'error';
      this.message = 'Les nouveaux mots de passe ne correspondent pas.';
      return;
    }


  }
}
