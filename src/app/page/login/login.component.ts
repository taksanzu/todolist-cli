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
    // Gọi phương thức đăng nhập từ AuthService
    this.authService.login(this.loginRequest)
      .subscribe(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('roles', JSON.stringify(response.roles));

        const roles = response.roles;
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/user']);
        } else {
          console.error('Không tìm thấy vai trò phù hợp');
        }
      }, error => {
        console.error('Đăng nhập thất bại:', error);
      });
  }
}
