import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = environment.apiUrl + '/admin/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Lấy danh sách người dùng
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API, { headers: this.getAuthHeaders() });
  }

  // Lấy người dùng theo id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`, {headers: this.getAuthHeaders()});
  }

  // Lấy người dùng là user
  getNormalUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/roles/user`, {headers: this.getAuthHeaders()});
  }

  // Sửa người dùng
  updateUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API}/${user.id}`, user, {headers: this.getAuthHeaders()});
  }

}
