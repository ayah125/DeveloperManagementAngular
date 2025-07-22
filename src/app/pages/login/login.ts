import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { LoginDTO } from '../../DTO/LoginDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loginErrors = {}; // reset errors

    this.authService.login(this.logindate).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          sessionStorage.setItem('userToken', res.userToken);

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome back!',
            confirmButtonColor: '#38598b',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        } else {
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

  loginWithGoogle() {
    this.authService.loginWithGoogle(this.rememberMe);
  }
}
