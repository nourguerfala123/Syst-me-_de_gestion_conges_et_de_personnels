import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Employe } from '../../auth/models/employe';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  employeeForm!: FormGroup;
  departements: any[] = [];

  employeeId!: number;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salaire: [null],
      idDept: [null],
      poste: [''],
      matricule: [''],
      dateEmbauche: ['']
    });

    this.loadEmployee();
   // this.loadDepartements();
  }

  loadEmployee(): void {
    this.isLoading = true;
    this.authService.getEmployeeById(this.employeeId).subscribe({
      next: (emp) => {
        this.employeeForm.patchValue({
          nom: emp.nom,
          prenom: emp.prenom,
          email: emp.email,
          salaire: emp.salaire,
         idDept: emp.idDept, 
          poste: emp.poste,
          matricule: emp.matricule,
          dateEmbauche: emp.dateEmbauche ? emp.dateEmbauche.substring(0, 10) : ''
        });
        this.isLoading = false;
      },
    error: (err) => {
  console.error('Erreur lors de la mise à jour', err);
  console.log('Détail erreur backend:', err.error);
  this.submitError = err.error?.erreur || 'Erreur lors de la mise à jour de l\'employé.';
  this.isSubmitting = false;
}
    });
  }

  /*loadDepartements(): void {
    this.authService.getDepartements().subscribe({
      next: (data) => {
        this.departements = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des départements', err);
      }
    });
  }*/
/*
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const dto = this.employeeForm.value;

    this.authService.updateEmployee(this.employeeId, dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/liste/liste']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        this.submitError = err.error?.erreur || 'Erreur lors de la mise à jour de l\'employé.';
        this.isSubmitting = false;
      }
    });
  }*/
//************************************** */

onSubmit(): void {
  console.log('Formulaire valide ?', this.employeeForm.valid); // 👈 ajoute
  console.log('Erreurs par champ:', {
    nom: this.employeeForm.get('nom')?.errors,
    prenom: this.employeeForm.get('prenom')?.errors,
    email: this.employeeForm.get('email')?.errors,
    salaire: this.employeeForm.get('salaire')?.errors,
    idDept: this.employeeForm.get('idDept')?.errors,
    poste: this.employeeForm.get('poste')?.errors,
    matricule: this.employeeForm.get('matricule')?.errors,
    dateEmbauche: this.employeeForm.get('dateEmbauche')?.errors,
  }); // 👈 ajoute

  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.submitError = '';

  const dto = this.employeeForm.value;
  console.log('DTO envoyé:', dto); 

  this.authService.updateEmployee(this.employeeId, dto).subscribe({
    next: () => {
      this.isSubmitting = false;
      this.router.navigate(['/dashboard/liste']);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour', err);
      console.log('Détail erreur backend:', err.error);
      this.submitError = err.error?.erreur || 'Erreur lors de la mise à jour de l\'employé.';
      this.isSubmitting = false;
    }
  });
}
//**************************************** */
  onAnnuler(): void {
    this.router.navigate(['/dashboard/liste']);
  }
}