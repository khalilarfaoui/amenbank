import { CommonModule } from '@angular/common';
import { VirementService } from './../../../services/virement.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mes-virements',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,   MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule
  ],
  templateUrl: './mes-virements.component.html',
  styleUrl: './mes-virements.component.css'
})
export class MesVirementsComponent {
  displayedColumns: string[] = ['id', 'compteSource', 'compteDest', 'montant', 'date', 'statut', 'devise', 'motif'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private virementService: VirementService) {}

  ngOnInit(): void {
    this.getAllVirements();
  }

  getAllVirements() {
    this.virementService.getAllVirements().subscribe((data: any[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
