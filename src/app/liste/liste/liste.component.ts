import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Employe } from '../../auth/models/employe';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, FormsModule], // 
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  employees: Employe[] = [];
  filteredEmployees: Employe[] = [];
  searchTerm: string = '';
  statutFilter: string = 'tous'; // déjà présent, on va s'en servir

  isLoading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.authService.getEmployees().subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
        this.filteredEmployees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des employés', err);
        this.errorMessage = 'Impossible de charger la liste des employés.';
        this.isLoading = false;
      }
    });
  }

  // la filtrage des employe selon le nom ou la statut
  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredEmployees = this.employees.filter(emp => {
      const matchNom =
        !term ||
        emp.nom.toLowerCase().includes(term) ||
        emp.prenom.toLowerCase().includes(term);

      const matchStatut =
        this.statutFilter === 'tous' ||
        emp.statut?.toLowerCase() === this.statutFilter.toLowerCase();

      return matchNom && matchStatut;
    });
  }

  // fait l'appelée quand on change le <select> du statut
  onStatutChange(): void {
    this.onSearch();
  }

  onModifier(emp: Employe): void {
    this.router.navigate(['/dashboard/modifier', emp.idEmploye]);
  }

  onAjouter(): void {
    this.router.navigate(['/dashboard/creation']);
  }
  onSupprimer(emp: Employe): void {
  const confirmation = confirm(
    `Voulez-vous vraiment désactiver le compte de ${emp.prenom} ${emp.nom} ?`
  );
  if (!confirmation) return;

  this.authService.deleteEmployee(emp.idEmploye).subscribe({
    next: () => {
      this.employees = this.employees.filter(e => e.idEmploye !== emp.idEmploye);
      this.filteredEmployees = this.filteredEmployees.filter(e => e.idEmploye !== emp.idEmploye);
    },
    error: (err) => {
      this.errorMessage = "Erreur lors de la désactivation de l'employé.";
      console.error(err);
    }
  });
}
 
  
}