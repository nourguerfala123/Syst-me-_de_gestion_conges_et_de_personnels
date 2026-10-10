export interface Employe {
  idEmploye: number;
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  salaire: number;
  deptNom?: string;
  matricule: string;
  dateEmbauche: string;
  idDept: number; 
  statut: string;
}