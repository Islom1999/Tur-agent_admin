import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPackage } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packegeSubject = new BehaviorSubject<IPackage[]>([])
  packege$ = this.packegeSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/package`;

  constructor(private http: HttpClient) {
    this.loadPackages()
  }

  loadPackages(): void {
    this.http.get<{ data: IPackage[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(packeges => {
      return this.packegeSubject.next(packeges)
    })
  }

  addPackage(packege: IPackage): Observable<IPackage> {
    return this.http.post<IPackage>(this.apiUrl, packege)
      .pipe(tap(newPackage => {
        const currentPackage = this.packegeSubject.getValue()
        this.packegeSubject.next([...currentPackage, newPackage])
      }))
  }

  updatePackage(id: string, updatedPackage: IPackage): Observable<IPackage> {
    return this.http.put<IPackage>(`${this.apiUrl}/${id}`, updatedPackage)
      .pipe(tap(updatedData => {
        const currentPackage = this.packegeSubject.getValue();
        const updatedPackage = currentPackage.map(packege =>
          packege.id === id ? updatedData : packege
        )
        this.packegeSubject.next(updatedPackage)
      }))
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentPackage = this.packegeSubject.getValue();
        const updatePackage = currentPackage.filter(packege => packege.id !== id);
        this.packegeSubject.next(updatePackage)
      }))
  }

  getAll(): Observable<IPackage[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IPackage[]>(url)
  }

  getById(id: string): Observable<IPackage> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IPackage>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IPackage> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IPackage>(url);
  }
}
