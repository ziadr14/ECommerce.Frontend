import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { IActiveAcount } from '../../Interface/iactiveAcount';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}


  register(form: any) {
    return this.http.post(`${this.baseUrl}/register`, form);
  }

  activeAccount(params: IActiveAcount) {
    return this.http.post(`${this.baseUrl}/active-account`, params);
  }

  login(form: any) {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/login`,
      form
    );
  }

  resetPassword(data: any) {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  forgotPassword(data: any) {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('basket_id');
  }

  getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return (
        payload.email ||
        payload.sub ||
        payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ]
      );
    } catch {
      return null;
    }
  }
}
