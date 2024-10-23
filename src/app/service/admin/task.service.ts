import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getAssignee() {
      throw new Error('Method not implemented.');
  }


  private API = environment.apiUrl + '/admin/tasks';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API, { headers: this.getAuthHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }

  getTasksByCategoryId(categoryId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API}?categoryId=${categoryId}`, { headers: this.getAuthHeaders() });
  }

  createTask(task: Partial<Task>, id: number, userId: number): Observable<Task> {
    return this.http.post<Task>(`${this.API}/categories/${id}/assign/${userId}`, task, { headers: this.getAuthHeaders() });
  }

  updateTask(task: Partial<Task>, categoryId: number, userId: number): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}/categories/${categoryId}/assign/${userId}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }
}
