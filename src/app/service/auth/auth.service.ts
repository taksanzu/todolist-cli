import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ChangePasswordRequest } from '../../models/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.API}/login`, loginRequest);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.API}/change-password`, changePasswordRequest, { headers: this.getAuthHeaders() });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_USER');
  }

}
