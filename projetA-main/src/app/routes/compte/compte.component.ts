import { Component, OnInit } from '@angular/core';
import { CompteService } from '../../services/compte.service';
import { Compte } from '../../models/compte';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { CompteDialogComponent } from './compte-dialog/compte-dialog.component';
@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [
    // MatCardModule,
    // MatFormFieldModule,
    // FormsModule,
    // MatTableModule,
    // MatInputModule,
    // MatButtonModule,
    // ReactiveFormsModule,
    // MatDialogModule,
    // MatSelectModule

  ],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {
  comptes: Compte[] = [];

  constructor(private compteService: CompteService) { }

  ngOnInit(): void {
    this.loadComptes();
  }

  loadComptes(): void {
    // this.compteService.getAllComptes().subscribe((data) => {
    //   this.comptes = data;
    // });
  }

  openDialog(compte?: Compte): void {
    // const dialogRef = this.dialog.open(CompteDialogComponent, {
    //   width: '400px',
    //   data: compte
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if (result.id) {
    //       this.updateCompte(result);
    //     } else {
    //       this.createCompte(result);
    //     }
    //   }
    // });
  }

  // createCompte(compte: Compte): void {
  //   this.compteService.createCompte(compte).subscribe(() => {
  //     this.loadComptes();
  //   });
  // }

  // updateCompte(compte: Compte): void {
  //   this.compteService.updateCompte(compte.id, compte).subscribe(() => {
  //     this.loadComptes();
  //   });
  // }

  // deleteCompte(id: number): void {
  //   this.compteService.deleteCompte(id).subscribe(() => {
  //     this.loadComptes();
  //   });
  // }
}
