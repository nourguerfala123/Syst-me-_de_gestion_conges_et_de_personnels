import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongeService } from '../../auth/services/conge.service';

@Component({
  selector: 'app-consulter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulter.component.html',
  styleUrl: './consulter.component.css'
})
export class ConsulterComponent implements OnInit {

  conge: any = null;
  chargement: boolean = true;
  errorMessage: string = '';

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    const idEmploye = Number(localStorage.getItem('IdEmploye'));

    if (!idEmploye) {
      this.errorMessage = 'Employé non identifié. Veuillez vous reconnecter.';
      this.chargement = false;
      return;
    }

    this.congeService.getConge(idEmploye).subscribe({
      next: (res: any) => {
        this.conge = res;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des congés', err);
        if (err.status === 404) {
          this.errorMessage = 'Vous n\'avez encore fait aucune demande de congé.';
        } else {
          this.errorMessage = 'Impossible de charger votre demande de congé.';
        }
        this.chargement = false;
      }
    });
  }
}