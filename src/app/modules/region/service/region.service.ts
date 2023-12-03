import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegion } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private regionSubject = new BehaviorSubject<IRegion[]>([])
  region$ = this.regionSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/region`;

  constructor(private http: HttpClient) {
    this.loadRegions()
  }

  loadRegions(): void {
    this.http.get<{ data: IRegion[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(regions => {
      return this.regionSubject.next(regions)
    })
  }

  addRegion(region: IRegion): Observable<IRegion> {
    return this.http.post<IRegion>(this.apiUrl, region)
      .pipe(tap(newRegion => {
        const currentRegion = this.regionSubject.getValue()
        this.regionSubject.next([...currentRegion, newRegion])
      }))
  }

  updateRegion(id: string, updatedRegion: IRegion): Observable<IRegion> {
    return this.http.put<IRegion>(`${this.apiUrl}/${id}`, updatedRegion)
      .pipe(tap(updatedData => {
        const currentRegion = this.regionSubject.getValue();
        const updatedRegion = currentRegion.map(region =>
          region.id === id ? updatedData : region
        )
        this.regionSubject.next(updatedRegion)
      }))
  }

  deleteRegion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentRegion = this.regionSubject.getValue();
        const updateRegion = currentRegion.filter(region => region.id !== id);
        this.regionSubject.next(updateRegion)
      }))
  }

  getAll(): Observable<IRegion[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IRegion[]>(url)
  }

  getById(id: string): Observable<IRegion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IRegion>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IRegion> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IRegion>(url);
  }
}
