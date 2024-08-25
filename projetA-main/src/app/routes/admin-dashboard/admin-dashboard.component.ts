import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/user';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component.componenet' ;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [
  ];
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = { data: this.users };
  transactions: any[] = [];
  transactionId: string = '';
  assignUsername: string = '';
  username: any;
  password: any;
  role: any;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  onCreateUser() {
    // const formValues = this.userForm.value;
    // // const newUser: User = {
    // //   // id: this.generateUserId(),
    // //   // username: formValues.username,
    // //   password: formValues.password,
    // //   role: formValues.role
    // // };
    // this.users.push(newUser);
    // this.userForm.reset();
    // this.dataSource.data = [...this.users];
    // console.log('Utilisateur créé !', formValues);
  }

  // private generateUserId(): number {
  //   return this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  // }

  onDeleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users.splice(index, 1);
          this.dataSource.data = [...this.users];
        } else {
          console.error(`User with ID ${user.id} not found.`);
        }
      }
    });
  }

  onResetPassword(user: User) {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundUser = this.users.find(u => u.id === user.id);
        if (foundUser) {
          foundUser.password = 'newPassword123'; // Example of password reset logic
          this.dataSource.data = [...this.users];
          // console.log(`Password reset for user ${foundUser.username}`);
        } else {
          console.error(`User with ID ${user.id} not found.`);
        }
      }
    });
  }

  onAssignTransaction() {
    const transaction = {
      id: this.transactions.length + 1,
      transactionId: this.transactionId,
      assignedTo: this.assignUsername
    };
    this.transactions.push(transaction);
    this.transactionId = '';
    this.assignUsername = '';
  }
}
