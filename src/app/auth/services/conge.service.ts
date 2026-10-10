import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { creationConge } from '../models/creationConge';
import { demande  } from '../models/demande';
@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private api = 'http://localhost:5145/api/Conges';

  constructor(private http: HttpClient) { }

  getConges(): Observable<[creationConge]> {
    return this.http.get<[creationConge]>(this.api);
  }

  getConge(id: number): Observable<creationConge> {
    return this.http.get<creationConge>(`${this.api}/${id}`);
  }
ajouterConge(demande: demande) {
  return this.http.post(`${this.api}/CreationConge`, demande)
}

  modifierStatut(id: number, statut: string): Observable<any> {
    return this.http.put(`${this.api}/${id}/statut`, {
      statut: statut
    });
  }
}