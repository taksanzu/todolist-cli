import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API, { headers: this.getAuthHeaders() });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.API, category, { headers: this.getAuthHeaders() });
  }

  updateCategory(category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.API}/${category.id}`, category, { headers: this.getAuthHeaders() });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }

}
