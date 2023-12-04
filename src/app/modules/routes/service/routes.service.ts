import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRoutes } from 'src/interfaces/routes';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private routesSubject = new BehaviorSubject<IRoutes[]>([])
  routes$ = this.routesSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/routes`;

  constructor(private http: HttpClient) {
    // this.loadRoutess()
  }

  loadRoutess(id:string): void {
    this.http.get<{ data: IRoutes[] }>(`${this.apiUrl}/pagination/?id=${id}`)
      .pipe(
        map(response => response.data)
    ).subscribe(routess => {
      return this.routesSubject.next(routess)
    })
  }

  addRoutes(routes: IRoutes): Observable<IRoutes> {
    return this.http.post<IRoutes>(this.apiUrl, routes)
      .pipe(tap(newRoutes => {
        const currentRoutes = this.routesSubject.getValue()
        this.routesSubject.next([...currentRoutes, newRoutes])
      }))
  }

  updateRoutes(id: string, updatedRoutes: IRoutes): Observable<IRoutes> {
    return this.http.put<IRoutes>(`${this.apiUrl}/${id}`, updatedRoutes)
      .pipe(tap(updatedData => {
        const currentRoutes = this.routesSubject.getValue();
        const updatedRoutes = currentRoutes.map(routes =>
          routes.id === id ? updatedData : routes
        )
        this.routesSubject.next(updatedRoutes)
      }))
  }

  deleteRoutes(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentRoutes = this.routesSubject.getValue();
        const updateRoutes = currentRoutes.filter(routes => routes.id !== id);
        this.routesSubject.next(updateRoutes)
      }))
  }

  getAll(): Observable<IRoutes[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IRoutes[]>(url)
  }

  getById(id: string): Observable<IRoutes> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IRoutes>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IRoutes> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IRoutes>(url);
  }
}
