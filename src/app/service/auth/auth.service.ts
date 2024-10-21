import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:8080/api/auth/login';  // URL của API

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(this.API, loginRequest);
  }

  // Kiểm tra xem JWT token có tồn tại hay không
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  // Đăng xuất người dùng
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Lấy danh sách các roles từ localStorage
  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  // Kiểm tra nếu người dùng có vai trò admin
  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_ADMIN');
  }

  // Kiểm tra nếu người dùng có vai trò user
  isUser(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_USER');
  }

}
