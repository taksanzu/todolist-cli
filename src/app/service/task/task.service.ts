import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private API = 'http://localhost:8080/api/tasks';

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

  getTasksByCategoryId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API}?id=${id}`, { headers: this.getAuthHeaders() });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task, { headers: this.getAuthHeaders() });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.getAuthHeaders() });
  }
}
