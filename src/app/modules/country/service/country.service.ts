import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICountry } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countrySubject = new BehaviorSubject<ICountry[]>([])
  country$ = this.countrySubject.asObservable()

  private apiUrl = `${environment.apiUrl}/country`;

  constructor(private http: HttpClient) {
    this.loadCountrys()
  }

  loadCountrys(): void {
    this.http.get<{ data: ICountry[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(countrys => {
      return this.countrySubject.next(countrys)
    })
  }

  addCountry(country: ICountry): Observable<ICountry> {
    return this.http.post<ICountry>(this.apiUrl, country)
      .pipe(tap(newCountry => {
        const currentCountry = this.countrySubject.getValue()
        this.countrySubject.next([...currentCountry, newCountry])
      }))
  }

  updateCountry(id: string, updatedCountry: ICountry): Observable<ICountry> {
    return this.http.put<ICountry>(`${this.apiUrl}/${id}`, updatedCountry)
      .pipe(tap(updatedData => {
        const currentCountry = this.countrySubject.getValue();
        const updatedCountry = currentCountry.map(country =>
          country.id === id ? updatedData : country
        )
        this.countrySubject.next(updatedCountry)
      }))
  }

  deleteCountry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentCountry = this.countrySubject.getValue();
        const updateCountry = currentCountry.filter(country => country.id !== id);
        this.countrySubject.next(updateCountry)
      }))
  }

  getAll(): Observable<ICountry[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<ICountry[]>(url)
  }

  getById(id: string): Observable<ICountry> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ICountry>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<ICountry> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<ICountry>(url);
  }
}
