import { VirementService } from './../../services/virement.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CompteService } from '../../services/compte.service';

@Component({
  selector: 'app-virement',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  accounts: any[] = [];
  currencies: string[] = ['TND', 'EUR', 'USD']; // Liste des devises
  dataSource: any[] = [];
  virementForm: FormGroup;
  user:any
  comptes : any
  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private compteService : CompteService,
    private virementService : VirementService
  ) {
    this.virementForm = this.fb.group({
      compteSourceId: ['', Validators.required],
      devise: ['', Validators.required],
      compteDestId: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0.01)]],
      motif: ['']
    });

  }

  ngOnInit(): void {
    this.authService.token$.subscribe(token=>{
      this.authService.getUserDetails(token).subscribe(res=>{
        this.user = res
        console.log(res);


        this.compteService.getAllComptes(this.user.id).subscribe((data) => {
          this.comptes = data;
        });
      })
    })

  }

  calculateTotalBalance(): number {
    return this.dataSource.reduce((acc, curr) => acc + curr.balance, 0);
  }

  onSubmitTransfer(): void {
    this.virementService.createVirement(this.virementForm.value).subscribe(res=>{
      console.log(res);
      location.reload()
    })
  }
}
