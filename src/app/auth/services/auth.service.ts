import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, lastValueFrom, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/types/login.type';
import { Tokens } from 'src/types/token.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = `${environment.apiUrl}/auth`;

  public getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  public setAuthToken(tokens: Tokens): void {
    localStorage.setItem('access_token', `${tokens.access_token}`);
    localStorage.setItem('refresh_token', `${tokens.refresh_token}`);
  }

  public removeAuthToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  login(login: Login): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/signin/local`, login);
  }

  logout(): Observable<boolean> {
    this.removeAuthToken();
    this.router.navigate(['/login']);
    return this.http.post<boolean>(`${this.apiUrl}/logout`, {});
  }

  updateTokens(): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/refresh`, {});
  }

  async isLoggedIn(): Promise<boolean> {
    const access_token = this.getAuthToken();
    const refresh_token = this.getRefreshToken();
    if (!access_token) {
      return false;
    }

    const expired = new JwtHelperService().isTokenExpired(access_token);
    if (expired && refresh_token && !new JwtHelperService().isTokenExpired(refresh_token)) {
      const tokens$ = this.updateTokens().pipe(
        take(1),
        catchError(() => {
          this.removeAuthToken();
          return [null];
        })
      );
      const tokens = await lastValueFrom(tokens$);

      if (tokens) this.setAuthToken(tokens);
      else return false;
    } else if (expired) {
      this.removeAuthToken();
      return false;
    }
    return true;
  }
}
