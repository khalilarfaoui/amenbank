import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticationRequest } from '../models/authentication-request';
import { VerificationRequest } from '../models/verification-request';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = localStorage.getItem('token');
  private baseUrl = 'http://localhost:8080/api/v1/auth';


  private booleanSubject = new BehaviorSubject<boolean>(this.token ? true : false);
  public boolean$ = this.booleanSubject.asObservable();




  setBooleanValue(value: boolean): void {
    this.booleanSubject.next(value);
  }


  getBooleanValue(): boolean {
    return this.booleanSubject.getValue();
  }

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/register`,
      registerRequest
    );
  }

  login(authRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/authenticate`,
      authRequest
    );
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/verify`,
      verificationRequest
    );
  }

  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.baseUrl}/user`, { headers });
  }
}
