import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './routes/home/home.component';
import { AdminDashboardComponent } from './routes/admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './routes/client-dashboard/client-dashboard.component';
import { LoginComponent } from './routes/login/login.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { VirementComponent } from './routes/virement/virement.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    VirementComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    LoginComponent,
    SignUpComponent,
    VirementComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'standaloneComponent';
}
