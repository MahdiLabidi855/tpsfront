import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email = '';
  password = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    this.authService.signin({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          // 👉 STOCKAGE POUR LE GUARD
          localStorage.setItem('user', JSON.stringify(res.user));

          // 👉 REDIRECTION
          this.router.navigate(['/list-equipe']);
        },
        error: (err) => alert(err.error.message || 'Erreur connexion')
      });
  }
}