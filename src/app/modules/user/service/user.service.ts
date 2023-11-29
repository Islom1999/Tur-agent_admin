import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Permissions } from 'src/enumerations';
import { environment } from 'src/environments/environment';
import { IPassword, IUser, IUserCreate, IUserRole } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser[]>([]);
  user$ = this.userSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  loadUser(): void {
    this.http
      .get<{ data: IUser[] }>(`${this.apiUrl}`)
      .pipe(map((response) => response.data))
      .subscribe((user) => {
        return this.userSubject.next(user);
      });
  }

  getPermisssion(): Observable<Permissions[]> {
    const url = `${this.apiUrl}/permission`;
    return this.http.get<Permissions[]>(url);
  }

  getById(id: string): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IUser>(url);
  }

  createUser(user: IUserCreate): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/create`, user)
      .pipe(tap(newUser => {
        const currentRole = this.userSubject.getValue()
        this.userSubject.next([...currentRole, newUser])
      }))
  }

  updateUserRole(id: string, updatedRole: IUserRole): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, updatedRole).pipe(
      tap((updatedData) => {
        const currentRole = this.userSubject.getValue();
        const updatedRole = currentRole.map((role) =>
          role.id === id ? updatedData : role
        );
        this.userSubject.next(updatedRole);
      })
    );
  }

  updateUserPassword(id: string, updatedRole: IPassword): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/password/update/${id}`, updatedRole).pipe(
      tap((updatedData) => {
        const currentRole = this.userSubject.getValue();
        const updatedRole = currentRole.map((role) =>
          role.id === id ? updatedData : role
        );
        this.userSubject.next(updatedRole);
      })
    );
  }

  // deleteRole(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     tap(() => {
  //       const currentRole = this.roleSubject.getValue();
  //       const updateRole = currentRole.filter((role) => role.id !== id);
  //       this.roleSubject.next(updateRole);
  //     })
  //   );
  // }

  // getItems(search: string, page: number, limit: number): Observable<IRole> {
  //   const url = `${this.apiUrl}?search=${search}&page=${page}&limit=${limit}`;
  //   return this.http.get<IRole>(url);
  // }
}
