import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { demande } from '../../auth/models/demande';
import { CongeService } from '../../auth/services/conge.service';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demande.component.html',   
  styleUrl: './demande.component.css'
})
export class DemandeComponent {
   errorMessage: string = '';
  successMessage: string = '';
  dateDebut: string = '';
  dateFin: string = '';
  libelle: string = '';
  Type: string = '';

  constructor(private congeService: CongeService, private router: Router) {}

  valider() {
    if (!this.dateDebut || !this.dateFin || !this.libelle || !this.Type) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.errorMessage = '';
    const IdEmploye = Number(localStorage.getItem('IdEmploye'));

    const nouvelleDemande: demande = {
      IdEmploye: IdEmploye,
      DateDebut: this.dateDebut,
      DateFin: this.dateFin,
      Libelle: this.libelle,
      Type: this.Type
    };

    this.congeService.ajouterConge(nouvelleDemande).subscribe({
      next: (res) => {
        console.log('Demande créée avec succès', res);
        this.successMessage = 'Votre demande a été envoyée avec succès !';
        setTimeout(() => {
          this.router.navigate(['/dashboard/mes-conges']);
        }, 1500);
      },
      error: (err) => {
        //console.error('Erreur lors de la création de la demande', err);
         console.error('Détail de l\'erreur:', err.error.errors);
        this.errorMessage = 'Une erreur est survenue lors de l\'envoi de la demande.';
      }
    });
  }
}