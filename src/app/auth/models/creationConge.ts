export interface creationConge {
  idConge: number;
  idEmploye: number;
  nomEmploye?: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  nbrJours: number;
  libelle: string;
  statut: string;
 nouveauStatut?: string; 
}