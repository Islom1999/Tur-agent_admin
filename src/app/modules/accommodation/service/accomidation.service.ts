import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccomidation } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccomidationService {
  private accomidationSubject = new BehaviorSubject<IAccomidation[]>([])
  accomidation$ = this.accomidationSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/accommodation`;

  constructor(private http: HttpClient) {
    // this.loadAccomidations()
  }

  loadAccomidations(id:string): void {
    this.http.get<{ data: IAccomidation[] }>(`${this.apiUrl}/pagination/?id=${id}`)
      .pipe(
        map(response => response.data)
    ).subscribe(accomidations => {
      return this.accomidationSubject.next(accomidations)
    })
  }

  addAccomidation(accomidation: IAccomidation): Observable<IAccomidation> {
    return this.http.post<IAccomidation>(this.apiUrl, accomidation)
      .pipe(tap(newAccomidation => {
        const currentAccomidation = this.accomidationSubject.getValue()
        this.accomidationSubject.next([...currentAccomidation, newAccomidation])
      }))
  }

  updateAccomidation(id: string, updatedAccomidation: IAccomidation): Observable<IAccomidation> {
    return this.http.put<IAccomidation>(`${this.apiUrl}/${id}`, updatedAccomidation)
      .pipe(tap(updatedData => {
        const currentAccomidation = this.accomidationSubject.getValue();
        const updatedAccomidation = currentAccomidation.map(accomidation =>
          accomidation.id === id ? updatedData : accomidation
        )
        this.accomidationSubject.next(updatedAccomidation)
      }))
  }

  deleteAccomidation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentAccomidation = this.accomidationSubject.getValue();
        const updateAccomidation = currentAccomidation.filter(accomidation => accomidation.id !== id);
        this.accomidationSubject.next(updateAccomidation)
      }))
  }

  getAll(): Observable<IAccomidation[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IAccomidation[]>(url)
  }

  getById(id: string): Observable<IAccomidation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IAccomidation>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IAccomidation> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IAccomidation>(url);
  }
}
