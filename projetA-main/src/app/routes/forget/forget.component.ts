import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent implements OnInit {
  conpassword: any;
  password: any;
  token: any;
  passwordChange = {
    newPassword: '',
    confirmPassword: '',
  };

  messageType: 'success' | 'error' | null = null;
  message: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      console.log(this.token);
      this.authService.verifyTokenResetPass(this.token).subscribe((res) => {
        console.log(res);
        this.message = res;
      });
    });
  }
  error: any;

  send() {
    if (this.password != this.conpassword) {
      this.error = 'Merci de confirmer le mot de passe';
    } else {
      this.authService
        .resetForgtenPass(this.token, this.password)
        .subscribe((res) => {
          this.router.navigateByUrl('login');
        });
    }
  }
}
