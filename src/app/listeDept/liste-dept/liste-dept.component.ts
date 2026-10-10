import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Dept } from '../../auth/models/dept';
import { DeptService } from '../../auth/services/dept.service';

@Component({
  selector: 'app-liste-dept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-dept.component.html',
  styleUrl: './liste-dept.component.css'
})
export class ListeDeptComponent implements OnInit {
  dept: Dept[] = [];
  filteredDept: Dept[] = []; 
  isLoading = true;
  errorMessage = '';

  constructor(
    private deptService: DeptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerDepartements();
  }

  chargerDepartements(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.deptService.getAllDepartements().subscribe({
      next: (data) => {
        this.dept = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement départements', err);
        this.errorMessage = 'Impossible de charger la liste des départements.';
        this.isLoading = false;
      }
    });
  }

  onAjouter(): void {
    this.router.navigate(['/dashboard/ajouter']);
  }
onModifier(dept: Dept): void {
  this.router.navigate(['/dashboard/modifier-dept', dept.idDept]);
}
 onSupprimer(dept: Dept): void {
  const confirmation = confirm(
    `Voulez-vous vraiment supprimer le département ${dept.nomDept} ?`
  );
  if (!confirmation) return;

  this.errorMessage = ''; // reset avant l'appel

  this.deptService.supprimerDept(dept.idDept).subscribe({
    next: () => {
      this.dept = this.dept.filter(d => d.idDept !== dept.idDept);
      this.filteredDept = this.filteredDept.filter(d => d.idDept !== dept.idDept);
    },
    error: (err) => {
      if (err.status === 409) {
        // Cas métier : des employés sont encore rattachés au département
        this.errorMessage = err.error?.erreur || 'Impossible de supprimer : des employés sont encore rattachés à ce département.';
      } else if (err.status === 404) {
        this.errorMessage = 'Ce département n\'existe plus.';
      } else {
        this.errorMessage = 'Erreur lors de la suppression du département.';
      }
      console.error(err);
    }
  });
}
}