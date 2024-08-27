import { MesVirementsComponent } from './routes/virement/mes-virements/mes-virements.component';
import { UserListComponent } from './routes/user-list/user-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'comptes',
    loadComponent: () =>
      import('./routes/mes-comptes/mes-comptes.component').then((mod) => mod.MesComptesComponent),
  },
  {
    path: 'admin-comptes',
    loadComponent: () =>
      import('./routes/admin-comptes/admin-comptes.component').then((mod) => mod.AdminComptesComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./routes/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'forget',
    loadComponent: () =>
      import('./routes/forget-password/forget-password.component').then(
        (mod) => mod.ForgetPasswordComponent
      ),
  },
  {
    path: 'resetpwd',
    loadComponent: () =>
      import('./routes/forget/forget.component').then(
        (mod) => mod.ForgetComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./routes/admin-dashboard/admin-dashboard.component').then(
        (mod) => mod.AdminDashboardComponent
      ),
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./routes/user-list/user-list.component').then(
        (mod) => mod.UserListComponent
      ),
  },
  {
    path: 'client',
    loadComponent: () =>
      import('./routes/client-dashboard/client-dashboard.component').then(
        (mod) => mod.ClientDashboardComponent
      ),
  },
  {
    path: 'mes-comptes',
    loadChildren: () =>
      import('./routes/compte/compte.component').then((mod) => mod.CompteComponent),
  },
  {
    path: 'virement',
    loadComponent: () =>
      import('./routes/virement/virement.component').then(
        (mod) => mod.VirementComponent
      ),
  },
  {
    path: 'mes-virements',
    loadComponent: () =>
      import('./routes/virement/mes-virements/mes-virements.component').then(
        (mod) => mod.MesVirementsComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./routes/sign-up/sign-up.component').then(
        (mod) => mod.SignUpComponent
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
