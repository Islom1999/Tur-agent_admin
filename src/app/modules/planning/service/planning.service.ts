import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlanning } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private planningSubject = new BehaviorSubject<IPlanning[]>([])
  planning$ = this.planningSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/planning`;

  constructor(private http: HttpClient) {
    this.loadPlannings()
  }

  loadPlannings(): void {
    this.http.get<{ data: IPlanning[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(plannings => {
      return this.planningSubject.next(plannings)
    })
  }

  addPlanning(planning: IPlanning): Observable<IPlanning> {
    return this.http.post<IPlanning>(this.apiUrl, planning)
      .pipe(tap(newPlanning => {
        const currentPlanning = this.planningSubject.getValue()
        this.planningSubject.next([...currentPlanning, newPlanning])
      }))
  }

  updatePlanning(id: string, updatedPlanning: IPlanning): Observable<IPlanning> {
    return this.http.put<IPlanning>(`${this.apiUrl}/${id}`, updatedPlanning)
      .pipe(tap(updatedData => {
        const currentPlanning = this.planningSubject.getValue();
        const updatedPlanning = currentPlanning.map(planning =>
          planning.id === id ? updatedData : planning
        )
        this.planningSubject.next(updatedPlanning)
      }))
  }

  deletePlanning(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentPlanning = this.planningSubject.getValue();
        const updatePlanning = currentPlanning.filter(planning => planning.id !== id);
        this.planningSubject.next(updatePlanning)
      }))
  }

  getAll(): Observable<IPlanning[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IPlanning[]>(url)
  }

  getById(id: string): Observable<IPlanning> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IPlanning>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IPlanning> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IPlanning>(url);
  }
}
