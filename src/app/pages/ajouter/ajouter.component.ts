import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Dept, DeptCreation } from '../../auth/models/dept';
import { DeptService } from '../../auth/services/dept.service';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.css'
})
export class AjouterComponent {
  nomDept: string = '';
  description: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false; 
  constructor(private deptService: DeptService, private router: Router) {}

  valider() {
    this.isSubmitting = true; 
    const nouveauDept: DeptCreation = {
      nomDept: this.nomDept,
      description: this.description,
    };

    this.deptService.ajouterDept(nouveauDept).subscribe({
      next: (res) => {
        this.successMessage = 'Département ajouté avec succès.';
        this.errorMessage = '';
         this.isSubmitting = false; 
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de l'ajout du département.";
        this.successMessage = '';
        console.error(err);
         this.isSubmitting = false; 
      }
    });
  }
   onAnnuler(): void {              
    this.router.navigate(['/dashboard/liste-dept']);
  }
}