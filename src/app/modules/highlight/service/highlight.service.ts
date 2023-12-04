import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHighlight } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  private highlightSubject = new BehaviorSubject<IHighlight[]>([])
  highlight$ = this.highlightSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/highlight`;

  constructor(private http: HttpClient) {
    // this.loadHighlights()
  }

  loadHighlights(id:string): void {
    this.http.get<{ data: IHighlight[] }>(`${this.apiUrl}/pagination/?id=${id}`)
      .pipe(
        map(response => response.data)
    ).subscribe(highlights => {
      return this.highlightSubject.next(highlights)
    })
  }

  addHighlight(highlight: IHighlight): Observable<IHighlight> {
    return this.http.post<IHighlight>(this.apiUrl, highlight)
      .pipe(tap(newHighlight => {
        const currentHighlight = this.highlightSubject.getValue()
        this.highlightSubject.next([...currentHighlight, newHighlight])
      }))
  }

  updateHighlight(id: string, updatedHighlight: IHighlight): Observable<IHighlight> {
    return this.http.put<IHighlight>(`${this.apiUrl}/${id}`, updatedHighlight)
      .pipe(tap(updatedData => {
        const currentHighlight = this.highlightSubject.getValue();
        const updatedHighlight = currentHighlight.map(highlight =>
          highlight.id === id ? updatedData : highlight
        )
        this.highlightSubject.next(updatedHighlight)
      }))
  }

  deleteHighlight(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentHighlight = this.highlightSubject.getValue();
        const updateHighlight = currentHighlight.filter(highlight => highlight.id !== id);
        this.highlightSubject.next(updateHighlight)
      }))
  }

  getAll(): Observable<IHighlight[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IHighlight[]>(url)
  }

  getById(id: string): Observable<IHighlight> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IHighlight>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IHighlight> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IHighlight>(url);
  }
}
