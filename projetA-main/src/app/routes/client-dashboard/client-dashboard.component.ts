import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  onTransfer() {
    throw new Error('Method not implemented.');
  }
  
  // Données pour les comptes et devises
  accounts = [
    { number: '123456789', label: 'Compte principal' },
    { number: '987654321', label: 'Compte épargne' },
    { number: '567891234', label: 'Compte courant' },
    { number: '456789012', label: 'Compte crédit' },
  ];

  currencies: string[] = ['TND', 'EUR', 'USD', 'CAD', 'GBP'];

  // DataSource pour le tableau
  dataSource = [
    { accountNumber: '123456789', accountLabel: 'Compte principal', date: new Date('2024-07-10'), currency: 'TND', balance: 2500.75 },
    { accountNumber: '987654321', accountLabel: 'Compte épargne', date: new Date('2024-07-10'), currency: 'TND', balance: 7500.32 },
    { accountNumber: '567891234', accountLabel: 'Compte courant', date: new Date('2024-07-10'), currency: 'TND', balance: 15000.0 },
    { accountNumber: '456789012', accountLabel: 'Compte crédit', date: new Date('2024-07-10'), currency: 'TND', balance: -500.0 },
  ];

  // Calcul du solde total
  totalBalance: number = this.calculateTotalBalance();
  
  // Colonnes à afficher dans le tableau
  displayedColumns: string[] = ['accountNumber', 'accountLabel', 'date', 'currency', 'balance'];
  
  // FormGroup pour le formulaire de virement
  transferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire de virement avec les règles de validation
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      currency: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      motif: [''],  // Remplacez 'reason' par 'motif'
      date: ['', Validators.required]  // Remplacez 'executionDate' par 'date'
    });
  }

  ngOnInit(): void {
    // La logique d'initialisation du composant peut être ajoutée ici
  }

  // Fonction pour calculer le solde total de tous les comptes
  calculateTotalBalance(): number {
    return this.dataSource.reduce((acc, curr) => acc + curr.balance, 0);
  }

  // Gestionnaire de soumission du formulaire
  onSubmitTransfer(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.value;
      console.log('Transfer data:', transferData);
      // La logique pour traiter le virement peut être ajoutée ici
    } else {
      console.log('Transfer form is invalid');
    }
  }
}
