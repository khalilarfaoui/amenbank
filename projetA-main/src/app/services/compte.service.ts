import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from '../models/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private baseUrl = 'http://localhost:8080/api/comptes';

  constructor(private http: HttpClient) { }

  // Get all comptes
  getAllComptes(id :any): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.baseUrl}/${id}`);
  }

  // Get a compte by ID
  getCompteById(id: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.baseUrl}/compteId/${id}`);
  }

  // Create a new compte
  createCompte(compte: Compte , id:any): Observable<Compte> {
    return this.http.post<Compte>(`${this.baseUrl}/${id}`, compte);
  }

  // Update a compte
  updateCompte(id: number, compte: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.baseUrl}/${id}`, compte);
  }

  // Delete a compte
  deleteCompte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
