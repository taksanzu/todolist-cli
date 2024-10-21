import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Lấy danh sách người dùng
  getUsers(): Observable<any> {
    return this.http.get(this.API, { headers: this.getAuthHeaders() });
  }
  
  // Lấy người dùng theo id
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }
}
