import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SignupDTO } from '../../DTO/RegisterDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../../DTO/LoginDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  private ApiUrl = 'http://localhost:5023';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.ngZone.run(() => {
        this.user = user;
        this.userSubject.next(user);
        console.log('Auth state changed:', user);
      });
    });
  }

  async loginWithGoogle(rememberMe: boolean) {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    await this.logout();

    await setPersistence(
      this.auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    return signInWithPopup(this.auth, provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.user = result.user;
          console.log('Logged in user:', this.user);
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }
  signup(SD: SignupDTO): Observable<any> {
    return this.http.post(`${this.ApiUrl}/api/Authentication/signup`, SD);
  }
  login(logindto: LoginDTO): Observable<any> {
    return this.http.post(`${this.ApiUrl}/api/Authentication/Login`, logindto);
  }
  logout() {
    return signOut(this.auth).then(() => {
      this.ngZone.run(() => {
        this.user = null;
        this.router.navigate(['/login']);
        this.user = null;
        this.userSubject.next(null);
      });
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
  }
}
