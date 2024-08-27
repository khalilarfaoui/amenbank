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
  private baseUrlUser = 'http://localhost:8080/api/users';

  private booleanSubject = new BehaviorSubject<boolean>(
    this.token ? true : false
  );
  public boolean$ = this.booleanSubject.asObservable();

  setBooleanValue(value: boolean): void {
    this.booleanSubject.next(value);
  }

  getBooleanValue(): boolean {
    return this.booleanSubject.getValue();
  }

  private tokenSubject = new BehaviorSubject<string>(
    this.token ? this.token : ''
  );
  public token$ = this.tokenSubject.asObservable();

  setTokenValue(value: string): void {
    this.tokenSubject.next(value);
  }

  getTokenValue(): string {
    return this.tokenSubject.getValue();
  }

  constructor(private http: HttpClient) {}

  verifyTokenResetPass(token: any) {
    return this.http.get(this.baseUrlUser + '/verify/rest/' + token);
  }

  resetForgtenPass(token: any, password: any) {
    return this.http.get(
      this.baseUrlUser + '/users/rest/' + token + '/' + password
    );
  }

  resetPassword(email: any) {
    return this.http.get(this.baseUrlUser + '/verif/' + email);
  }

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

  getUserDetails(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user`, { headers });
  }
}
