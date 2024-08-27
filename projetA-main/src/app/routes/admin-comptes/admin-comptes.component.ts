import { Component, OnInit } from '@angular/core';
import { CompteService } from '../../services/compte.service';
import { Compte } from '../../models/compte';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CompteDialogComponent } from '../mes-comptes/compte-dialog/compte-dialog.component';

@Component({
  selector: 'app-admin-comptes',
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
  ],
  templateUrl: './admin-comptes.component.html',
  styleUrl: './admin-comptes.component.css',
})
export class AdminComptesComponent {
  comptes: Compte[] = [];
  user: any;
  constructor(
    private compteService: CompteService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadComptes();
  }

  ngOnInit(): void {}

  loadComptes(): void {
    this.compteService.getAllComptesAdmin().subscribe((data) => {
      this.comptes = data;
      console.log(this.comptes);

    });
  }

  openDialog(compte?: Compte): void {
    const dialogRef = this.dialog.open(CompteDialogComponent, {
      width: '400px',
      data: compte,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.updateCompte(result);
        } else {
          this.createCompte(result);
        }
      }
    });
  }

  detailsCompte(data: any) {
    this.router.navigateByUrl('mes-virements');
  }

  createCompte(compte: Compte): void {
    this.compteService.createCompte(compte , compte.userId).subscribe(() => {
      this.loadComptes();
    });
  }

  updateCompte(compte: Compte): void {
    this.compteService.updateCompte(compte.id, compte).subscribe(() => {
      this.loadComptes();
    });
  }

  deleteCompte(id: number): void {
    this.compteService.deleteCompte(id).subscribe(() => {
      this.loadComptes();
    });
  }
}
