import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPartner } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private partnerSubject = new BehaviorSubject<IPartner[]>([])
  partner$ = this.partnerSubject.asObservable()

  private apiUrl = `${environment.apiUrl}/partner`;

  constructor(private http: HttpClient) {
    this.loadPartners()
  }

  loadPartners(): void {
    this.http.get<{ data: IPartner[] }>(`${this.apiUrl}/pagination`)
      .pipe(
        map(response => response.data)
    ).subscribe(partners => {
      return this.partnerSubject.next(partners)
    })
  }

  addPartner(partner: IPartner): Observable<IPartner> {
    return this.http.post<IPartner>(this.apiUrl, partner)
      .pipe(tap(newPartner => {
        const currentPartner = this.partnerSubject.getValue()
        this.partnerSubject.next([...currentPartner, newPartner])
      }))
  }

  updatePartner(id: string, updatedPartner: IPartner): Observable<IPartner> {
    return this.http.put<IPartner>(`${this.apiUrl}/${id}`, updatedPartner)
      .pipe(tap(updatedData => {
        const currentPartner = this.partnerSubject.getValue();
        const updatedPartner = currentPartner.map(partner =>
          partner.id === id ? updatedData : partner
        )
        this.partnerSubject.next(updatedPartner)
      }))
  }

  deletePartner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => {
        const currentPartner = this.partnerSubject.getValue();
        const updatePartner = currentPartner.filter(partner => partner.id !== id);
        this.partnerSubject.next(updatePartner)
      }))
  }

  getAll(): Observable<IPartner[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IPartner[]>(url)
  }

  getById(id: string): Observable<IPartner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IPartner>(url)
  }

  getItems(search: string, page: number, limit: number): Observable<IPartner> {
    const url = `${this.apiUrl}/pagination/?search=${search}&page=${page}&limit=${limit}`;
    return this.http.get<IPartner>(url);
  }
}
