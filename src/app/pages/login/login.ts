import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { LoginDTO } from '../../DTO/LoginDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';

interface DecodedToken {
  [key: string]: any;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  logindate: LoginDTO = {
    email: '',
    password: '',
  };
  rememberMe: boolean = false;
  loginErrors: { [key: string]: string } = {};

  constructor(
    private authService: AuthService,
    private workspaceService: Workspace,
    private router: Router
  ) {}

  login() {
    this.loginErrors = {};

    this.authService.login(this.logindate).subscribe({
      next: (res) => {
        if (res.isSuccess && res.userToken) {
          // حفظ التوكن (الخدمة نفسها بتعمل setToken)
          localStorage.setItem('userToken', res.userToken);

          // فك التوكن لو محتاجة userId
          const decode: DecodedToken = jwt_decode.jwtDecode(res.userToken);
          const userIdFromToken = decode[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ];
          localStorage.setItem('userID', userIdFromToken);

          // تحميل الـ Workspaces الخاصة بالمستخدم
          this.workspaceService.loadUserWorkspacesFromApi();

          // إظهار رسالة نجاح
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back!',
            confirmButtonColor: '#38598b',
          }).then(() => {
            this.router.navigate(['/home']);
          });

          // مش محتاج نعمل next هنا، AuthService عملها بالفعل
        } else {
          // التعامل مع الأخطاء القادمة من السيرفر
          if (res.errors && Array.isArray(res.errors)) {
            res.errors.forEach((errorMsg: string) => {
              if (errorMsg.toLowerCase().includes('email')) {
                this.loginErrors['email'] = errorMsg;
              } else if (errorMsg.toLowerCase().includes('password')) {
                this.loginErrors['password'] = errorMsg;
              } else {
                this.loginErrors['general'] = errorMsg;
              }
            });
          } else {
            this.loginErrors['general'] = res.message || 'Login failed.';
          }

          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: this.loginErrors['general'] || 'Please check your data',
            confirmButtonColor: '#38598b',
          });
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginErrors['general'] =
          err.error?.message || 'An error occurred while logging in.';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.loginErrors['general'],
          confirmButtonColor: '#38598b',
        });
      },
    });
  }

  // loginWithGoogle() {
  //   this.authService.login(this.rememberMe);
  // }
}
