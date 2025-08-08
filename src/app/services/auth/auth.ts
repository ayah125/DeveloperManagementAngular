import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../DTO/LoginDTO';
import { SignupDTO } from '../../DTO/RegisterDTO';
import { jwtDecode } from 'jwt-decode';
import { AppUser } from '../../interfaces/appuser';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7293';
  private userSubject = new BehaviorSubject<AppUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    const token = this.getToken();
    if (token) {
      this.updateUserFromToken(token);
    }
  }
  checkLogin() {
    return !!localStorage.getItem('token');
  }
  private updateUserFromToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      const usernameFromToken =
        decoded['https://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
        decoded['unique_name'] ||
        'User';
      this.userSubject.next({ displayName: usernameFromToken });
    } catch (error) {
      console.error('Error decoding token:', error);
      this.userSubject.next(null);
    }
  }

  signup(signupDto: SignupDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Authentication/signup`, signupDto);
  }

  login(loginDto: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Authentication/Login`, loginDto)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            this.setToken(response.token);
            this.updateUserFromToken(response.token); // ⬅️ أهم خطوة لتحديث البيانات مباشرة
          }
        })
      );
  }

  logout() {
    this.removeToken();
    
    this.userSubject.next(null);
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  removeToken() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('workspaces');


  }
}
