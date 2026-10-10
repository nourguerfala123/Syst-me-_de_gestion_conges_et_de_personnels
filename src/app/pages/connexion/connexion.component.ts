import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule ],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  connexion() {
  const user = {
    email: this.email,
    password: this.password
  };

  this.authService.login(user).subscribe({
  next: (res: any) => {
    console.log('Login OK', res);
    this.errorMessage = '';
    localStorage.setItem('IdEmploye', res.idEmploye);
    localStorage.setItem('Role', res.role);

    if (res.role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard-emp']);
    }
  },
  error: (err) => {
    console.log('connexion echouée', err);
    this.errorMessage = 'Email ou mot de passe incorrect.';
  }
});
  }
}