import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isConnect: boolean = false;
  user: any;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.token$.subscribe(token=>{
      this.authService.getUserDetails(token).subscribe((res) => {
        console.log(res);
        if (res) {
          this.user = res
          this.isConnect = true;
          this.authService.setBooleanValue(true);
        }
      });
    })

    this.authService.boolean$.subscribe((res) => {
      console.log(res);
      this.isConnect = res;
    });
  }
  ngOnInit(): void {

  }

  logout() {
    localStorage.removeItem('token');
    this.isConnect = false;
    this.authService.setBooleanValue(false);
    this.router.navigateByUrl('login');
  }
}
