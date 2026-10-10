import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private employesUrl = `${environment.apiUrl}/Employees`;

  constructor(private http: HttpClient ,private router: Router ) {}

  login(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dto);
  }
  //deconnexion
   logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null; 
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }







  //***************************************** */

  empCreation(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empCreation`, dto);
  }

  getEmployees(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.employesUrl);
  }

  getEmployeeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.employesUrl}/${id}`);
  }

  updateEmployee(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.employesUrl}/${id}`, dto);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.employesUrl}/${id}`);
  }
/*getDepartements(id:number): Observable<any[]> {
  return this.http.get<any[]>(`${this.employesUrl}/${id}`);
}*/
 

  
}