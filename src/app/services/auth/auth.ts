import { BehaviorSubject, Observable, tap } from "rxjs";
import { env } from "../../../enviroment/environment";
import { AppUser } from "../../interfaces/appuser";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { SignupDTO } from "../../DTO/RegisterDTO";
import { LoginDTO } from "../../DTO/LoginDTO";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = env.apiUrl;
  private userSubject = new BehaviorSubject<AppUser | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly TOKEN_KEY = 'userToken'; 

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    const token = this.getToken();
    if (token) {
      this.updateUserFromToken(token);
    }
  }

  checkLogin() {
    return !!localStorage.getItem(this.TOKEN_KEY);
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
            this.updateUserFromToken(response.token); // ✅ تحديث الزرار فورًا
          }
        })
      );
  }

  logout() {
    this.removeToken();
    this.userSubject.next(null); // ✅ تحديث فوري للـ Observable
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

setToken(token: string) {
  localStorage.setItem(this.TOKEN_KEY, token);
  this.ngZone.run(() => this.updateUserFromToken(token)); // ✅ يضمن تحديث الـ UI
}


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY); // ✅ مفتاح موحد
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY); // ✅ مفتاح موحد
    localStorage.removeItem('userID');
    localStorage.removeItem('workspaces');
  }
}
