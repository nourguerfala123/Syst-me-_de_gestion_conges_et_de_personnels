import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dept } from '../../auth/models/dept';
import { DeptService } from '../../auth/services/dept.service';

@Component({
  selector: 'app-modifier-dept',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-dept.component.html',
  styleUrl: './modifier-dept.component.css'
})
export class ModifierDeptComponent implements OnInit {
  deptForm: FormGroup;
  idDept!: number;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private deptService: DeptService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deptForm = this.fb.group({
      nomDept: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idDept = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerDept();
  }

  chargerDept(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.deptService.getDeptById(this.idDept).subscribe({
      next: (dept: Dept) => {
        this.deptForm.patchValue({
          nomDept: dept.nomDept,
          description: dept.description,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement département', err);
        this.errorMessage = 'Impossible de charger le département.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.deptForm.invalid) {
      this.deptForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    this.deptService.modifierDept(this.idDept, this.deptForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/liste-dept']);
      },
      error: (err) => {
        console.error('Erreur modification département', err);
        this.submitError = 'Erreur lors de la modification du département.';
        this.isSubmitting = false;
      }
    });
  }

  onAnnuler(): void {
    this.router.navigate(['/dashboard/liste-dept']);
  }
}