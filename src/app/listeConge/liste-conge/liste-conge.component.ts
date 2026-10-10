import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CongeService } from '../../auth/services/conge.service';
import { creationConge } from '../../auth/models/creationConge';

@Component({
  selector: 'app-liste-conges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-conge.component.html',
  styleUrls: ['./liste-conge.component.css'],

})
export class ListeCongesComponent implements OnInit {

  conges: creationConge[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.chargerConges();
  }

  chargerConges() {
    this.isLoading = true;
    this.errorMessage = '';

    this.congeService.getConges().subscribe({
      next: (data) => {
        this.conges = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Erreur lors du chargement des demandes de congé.';
        this.isLoading = false;
      }
    });
  }

  modifierStatut(id: number, statut: string | undefined): void {
  if (!statut) {
    this.errorMessage = 'Veuillez sélectionner un statut avant de valider.';
    return;
  }

  this.congeService.modifierStatut(id, statut).subscribe({
    next: () => {
      console.log('Statut mis à jour');
      this.chargerConges();
    },
    error: (err) => {
      console.log('Erreur complète:', err);
      console.log('Message backend:', err.error);
      this.errorMessage = err.error || 'Erreur lors de la mise à jour du statut.';
    }
  });
}

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'Approuvé':
      case 'Accepté':
        return 'bg-success';
      case 'Refusé':
        return 'bg-danger';
      case 'En attente':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  }

}