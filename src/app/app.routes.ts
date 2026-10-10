import { Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { CreationComponent } from './pages/creation/creation.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListeComponent } from './liste/liste/liste.component';
import { ModifierComponent } from './pages/modifier/modifier.component';
import { ListeCongesComponent } from './listeConge/liste-conge/liste-conge.component';
import { DemandeComponent } from './pages/demande/demande.component';
import { DashboardEmpComponent } from './dashboardEmp/dashboard-emp/dashboard-emp.component';
import { ConsulterComponent } from './pages/consulter/consulter.component';
import { AjouterComponent } from './pages/ajouter/ajouter.component';
import { ListeDeptComponent } from './listeDept/liste-dept/liste-dept.component';
import { ModifierDeptComponent } from './pages/modifier-dept/modifier-dept.component';
export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'liste', component: ListeComponent },
    { path: 'liste-conge', component: ListeCongesComponent },
      { path: 'creation', component: CreationComponent },
      { path: 'modifier/:id', component: ModifierComponent },
      {path:'ajouter',component:AjouterComponent},
      {path:'liste-dept',component:ListeDeptComponent},
      { path: 'modifier-dept/:id', component: ModifierDeptComponent }
    ]
  },
  {
    path:'dashboard-emp', component:DashboardEmpComponent,
    children :[{path:'demande',component:DemandeComponent},
      {path:'consulter',component:ConsulterComponent},

    ]
  },
  { path: '**', redirectTo: 'connexion' }
];