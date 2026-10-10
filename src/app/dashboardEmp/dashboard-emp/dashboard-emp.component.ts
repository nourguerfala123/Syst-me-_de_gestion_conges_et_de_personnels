import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-emp',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-emp.component.html',
  styleUrl: './dashboard-emp.component.css'
})
export class DashboardEmpComponent {

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }

}