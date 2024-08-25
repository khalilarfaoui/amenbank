import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/user';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component.componenet';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-user-list',
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
    MatIconModule,
    MatStepperModule,
    MatDividerModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user ? user : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          this.updateUser(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe(() => this.loadUsers());
  }

  updateUser(user: User): void {
    this.userService.updateUser(user.id!, user).subscribe(() => this.loadUsers());
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
