import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-creation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  role: 'employe' | 'admin' = 'employe';
  matricule: string = '';
  poste: string = '';
  salaire: number = 0;
  //dateEmbauche: DateTime.Now;
  id_dept: number = 0;

  errorMessage: string = '';
  successMessage: string = '';
    isSubmitting: boolean = false; 
  constructor(private authService: AuthService, private router: Router) {}

  valider() {
    const nouveauCompte = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      role: this.role,
      matricule: this.matricule,
      poste: this.poste,
      salaire: this.salaire,
      //dateEmpauche: this.dateEmbauche,  
      motDePasse: this.password,
      id_dept :this.id_dept
    };

   this.authService.empCreation(nouveauCompte).subscribe({
  next: (res: any) => {
    console.log('Employé créé', res);
    this.successMessage = 'Compte créé avec succès !';
    this.errorMessage = '';
    this.isSubmitting = false; 
    this.router.navigate(['dashboard/liste']);
  },
  error: (err) => {
        console.log('Erreur création employé', err);
        console.log('Détail erreur (err.error) :', JSON.stringify(err.error, null, 2));
        this.errorMessage = err.error?.Erreur || err.error?.detail || err.error || 'Une erreur est survenue.';
        this.successMessage = '';
        this.isSubmitting = false; 
      }
});
  }

    onAnnuler(): void {   
    this.router.navigate(['/dashboard/liste']); 
  }
}