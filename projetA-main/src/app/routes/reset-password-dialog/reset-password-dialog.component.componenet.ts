import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password-dialog',
  template: `
    <div class="dialog-content">
      <h2>Réinitialiser le mot de passe</h2>
      <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Mot de passe actuel</mat-label>
          <input matInput type="password" formControlName="currentPassword">
          <mat-error *ngIf="resetPasswordForm.get('currentPassword')?.hasError('required')">
            Le mot de passe actuel est requis
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Nouveau mot de passe</mat-label>
          <input matInput type="password" formControlName="newPassword">
          <mat-error *ngIf="resetPasswordForm.get('newPassword')?.hasError('required')">
            Le nouveau mot de passe est requis
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Confirmer le nouveau mot de passe</mat-label>
          <input matInput type="password" formControlName="confirmPassword">
          <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('required')">
            Veuillez confirmer votre nouveau mot de passe
          </mat-error>
        </mat-form-field>

        <div class="dialog-actions">
          <button mat-button (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!resetPasswordForm.valid">
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-content {
      text-align: center;
      padding: 20px;
      border-radius: 8px;
      background: linear-gradient(to bottom right, #f5f5f5, #e0e0e0);
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }

    .dialog-content h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .dialog-actions {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }

    .dialog-actions button {
      padding: 10px 20px;
      border-radius: 25px;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .dialog-actions button:hover {
      transform: translateY(-2px);
    }

    .dialog-actions button:active {
      transform: translateY(0);
    }

    button[mat-button] {
      color: #757575;
    }

    button[mat-raised-button] {
      background-color: #64b5f6;
    }

    button[mat-raised-button]:hover {
      background-color: #42a5f5;
    }

    mat-form-field {
      width: 100%;
    }
  `],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ResetPasswordDialogComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>
  ) {
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      // Add logic to handle password reset
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
