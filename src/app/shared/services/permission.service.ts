import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissions } from 'src/enumerations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}
  
  getPermisssion(): Observable<Permissions[]> {
    const url = `${this.apiUrl}/permission`;
    return this.http.get<Permissions[]>(url);
  }
}
