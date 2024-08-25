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
import { CompteDialogComponent } from './compte-dialog/compte-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-comptes',
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
    MatSelectModule

  ],
  templateUrl: './mes-comptes.component.html',
  styleUrl: './mes-comptes.component.css'
})
export class MesComptesComponent {
  comptes: Compte[] = [];
  user : any
  constructor(
    private compteService: CompteService,
    private dialog: MatDialog,
    private authService : AuthService,
    private router : Router
  ) {
    this.loadComptes();
  }

  ngOnInit(): void {

  }

  loadComptes(): void {
    this.authService.getUserDetails().subscribe(res=>{
      this.user = res
      console.log(res);


      this.compteService.getAllComptes(this.user.id).subscribe((data) => {
        this.comptes = data;
      });
    })
  }

  openDialog(compte?: Compte): void {
    const dialogRef = this.dialog.open(CompteDialogComponent, {
      width: '400px',
      data: compte
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateCompte(result);
        } else {
          this.createCompte(result);
        }
      }
    });
  }

  detailsCompte(data:any){
    this.router.navigateByUrl('mes-virements')
  }

  createCompte(compte: Compte): void {
    this.compteService.createCompte(compte , this.user.id).subscribe(() => {
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
