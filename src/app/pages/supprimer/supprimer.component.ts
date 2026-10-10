import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-supprimer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supprimer.component.html',
  styleUrls: ['./supprimer.component.css']
})
export class SupprimerComponent {

  idEmploye!: number;
  message: string = '';

  constructor(private authService: AuthService) {}

  supprimerEmploye(): void {

    if (!this.idEmploye) {
      this.message = "Veuillez saisir un ID.";
      return;
    }

    this.authService.supprimer(this.idEmploye).subscribe({
      next: () => {
        this.message = "Employé supprimé avec succès.";
        this.idEmploye = 0;
      },
      error: () => {
        this.message = "Erreur lors de la suppression de l'employé.";
      }
    });

  }

}