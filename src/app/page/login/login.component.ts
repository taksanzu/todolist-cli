import { Component } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.loginRequest)
      .subscribe(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('roles', JSON.stringify(response.roles));

        const roles = response.roles;
        roles.includes('ROLE_ADMIN') ? this.router.navigate(['/admin']) :
          roles.includes('ROLE_USER') ? this.router.navigate(['/user']) :
            this.router.navigate(['/login']);
      }, error => {
        console.error('Đăng nhập thất bại:', error);
      });
  }
}
