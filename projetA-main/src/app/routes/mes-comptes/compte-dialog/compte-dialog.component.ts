import { UserService } from './../../../services/user.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Compte } from '../../../models/compte';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compte-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './compte-dialog.component.html',
  styleUrl: './compte-dialog.component.css'
})
export class CompteDialogComponent {
  compte: Compte = { id: 0, numeroCompte: '',compteEnum : 'Courant' , devise : '', solde: 0, mouvements: [] , userId : ""};
  compteTypes: string[] = ['Principal', 'Epargne', 'Courant', 'Crédit'];
  constructor(
    public dialogRef: MatDialogRef<CompteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Compte,
    private UserService : UserService
  ) {}
user : any
  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe(res=>{
      this.user = res
    })
    if (this.data) {
      this.compte = { ...this.data };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.compte);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
