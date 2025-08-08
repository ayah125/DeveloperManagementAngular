
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth';


@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.checkLogin()) {
      this.router.navigate(['/home']); // أو الصفحة الرئيسية
      return false;
    }
    return true;
  }
}
