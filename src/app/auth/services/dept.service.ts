import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Dept } from '../models/dept';
import {DeptCreation} from '../models/dept'

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  private api = 'http://localhost:5145/api/Dept';

  constructor(private http: HttpClient) { }

getAllDepartements(): Observable<Dept[]> {
  return this.http.get<Dept[]>(this.api); 
}

 /* // GET : récupérer un département par son id
  getDeptById(id: number): Observable<Dept> {
    return this.http.get<Dept>(`${this.api}/${id}`);
  }*/

  // POST : ajouter un nouveau département
ajouterDept(dept: DeptCreation): Observable<Dept> {
  return this.http.post<Dept>(`${this.api}/Creation`, dept);
}

  // PUT : modifier un département existant
modifierDept(id: number, dept: DeptCreation): Observable<Dept> {
  return this.http.put<Dept>(`${this.api}/${id}`, dept);
}


  getDeptById(id: number): Observable<Dept> {
  return this.http.get<Dept>(`${this.api}/${id}`);
}



  // DELETE : supprimer un département
  supprimerDept(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}