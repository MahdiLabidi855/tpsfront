import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    this.authService.signup({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: res => {
          alert('Inscription réussie !');
          this.router.navigate(['/signin']);
        },
        error: err => alert(err.error.message || 'Erreur inscription')
      });
  }
}
