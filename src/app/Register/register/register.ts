import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { SignupDTO } from '../../DTO/RegisterDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // <-- استيراد SweetAlert2

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registrationErrors: { [key: string]: string } = {};

  constructor(public authservices: AuthService, private router: Router) {}

  registerData: SignupDTO = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  register() {
    console.log('Trying to register with: ', this.registerData);
    this.registrationErrors = {}; // reset

    this.authservices.signup(this.registerData).subscribe({
      next: (res) => {
        console.log('Response from server:', res);
        if (res.isSuccess) {
          // ✅ SweetAlert بدلاً من alert العادية
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You can now log in.',
            confirmButtonColor: '#38598b',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          if (res.errors && Array.isArray(res.errors)) {
            res.errors.forEach((errorMsg: string) => {
              if (errorMsg.toLowerCase().includes('username')) {
                this.registrationErrors['username'] = errorMsg;
              } else if (errorMsg.toLowerCase().includes('email')) {
                this.registrationErrors['email'] = errorMsg;
              } else if (errorMsg.toLowerCase().includes('password')) {
                if (errorMsg.toLowerCase().includes('confirm')) {
                  this.registrationErrors['confirmPassword'] = errorMsg;
                } else {
                  this.registrationErrors['password'] = errorMsg;
                }
              } else {
                this.registrationErrors['general'] = errorMsg;
              }
            });
            // ✅ إظهار Alert عام لو في أخطاء
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: res.errors.join('\n'),
              confirmButtonColor: '#d33',
            });
          } else {
            this.registrationErrors['general'] =
              res.message || 'Registration failed.';
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: res.message || 'Registration failed.',
              confirmButtonColor: '#d33',
            });
          }
        }
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.registrationErrors = {}; // reset

        if (err.error?.errors && Array.isArray(err.error.errors)) {
          err.error.errors.forEach((errorMsg: string) => {
            if (errorMsg.toLowerCase().includes('username')) {
              this.registrationErrors['username'] = errorMsg;
            } else if (errorMsg.toLowerCase().includes('email')) {
              this.registrationErrors['email'] = errorMsg;
            } else if (errorMsg.toLowerCase().includes('password')) {
              if (errorMsg.toLowerCase().includes('confirm')) {
                this.registrationErrors['confirmPassword'] = errorMsg;
              } else {
                this.registrationErrors['password'] = errorMsg;
              }
            } else {
              this.registrationErrors['general'] = errorMsg;
            }
          });
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.error.errors.join('\n'),
            confirmButtonColor: '#d33',
          });
        } else {
          this.registrationErrors['general'] =
            err.error?.message || 'Error occurred while registering.';
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: err.error?.message || 'Error occurred while registering.',
            confirmButtonColor: '#d33',
          });
        }
      },
    });
  }
}
