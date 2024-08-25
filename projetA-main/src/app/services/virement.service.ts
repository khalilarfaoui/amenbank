import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Virement } from '../models/virement';

@Injectable({
  providedIn: 'root'
})
export class VirementService {
  private baseUrl = 'http://localhost:8080/api/virements';

  constructor(private http: HttpClient) {}

  getAllVirements(): Observable<Virement[]> {
    return this.http.get<Virement[]>(`${this.baseUrl}`);
  }

  getVirementById(id: number): Observable<Virement> {
    return this.http.get<Virement>(`${this.baseUrl}/${id}`);
  }

  createVirement(virement: Virement): Observable<Virement> {
    return this.http.post<Virement>(`${this.baseUrl}`, virement);
  }

  updateVirement(id: number, virement: Virement): Observable<Virement> {
    return this.http.put<Virement>(`${this.baseUrl}/${id}`, virement);
  }

  deleteVirement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
