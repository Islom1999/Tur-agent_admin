import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole } from 'src/interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject = new BehaviorSubject<IRole[]>([])
  role$ = this.roleSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/role`;

  constructor(private http: HttpClient) {
    this.loadRoles()
  }

  loadRoles(): void {
    this.http.get<{ data: IRole[] }>(`${this.apiUrl}/percentage`)
      .pipe(
        map(response => response.data)
    ).subscribe(roles => {
      return this.roleSubject.next(roles)
    })
  }

  addRole(role: IRole): Observable<IRole> {
    return this.http.post<IRole>(this.apiUrl, role)
      .pipe(tap(newRole => {
        const currentRole = this.roleSubject.getValue()
        this.roleSubject.next([...currentRole, newRole])
      }))
  }

  updateRole(id: string, updatedRole: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.apiUrl}/${id}`, updatedRole)
      .pipe(tap(updatedData => {
        const currentRole = this.roleSubject.getValue();
        const updatedRole = currentRole.map(role =>
          role.id === id ? updatedData : role
        )
        this.roleSubject.next(updatedRole)
      }))
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentRole = this.roleSubject.getValue();
        const updateRole = currentRole.filter(role => role.id !== id);
        this.roleSubject.next(updateRole)
      }))
  }

  getAll(): Observable<IRole[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IRole[]>(url)
  }

  getById(id: string): Observable<IRole> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IRole>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IRole> {
    const url = `${this.apiUrl}/percentege/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IRole>(url);
  }
}
