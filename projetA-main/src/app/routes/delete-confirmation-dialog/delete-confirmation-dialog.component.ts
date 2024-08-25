import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <div class="dialog-content">
      <h2>Confirmer la suppression</h2>
      <p>Voulez-vous vraiment supprimer cette personne ?</p>
      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">Annuler</button>
        <button mat-raised-button color="warn" (click)="onConfirm()">Supprimer</button>
      </div>
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

.dialog-content p {
  font-size: 1rem;
  margin-bottom: 25px;
  color: #666;
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
  background-color: #e57373;
}

button[mat-raised-button]:hover {
  background-color: #ef5350;
}

  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
