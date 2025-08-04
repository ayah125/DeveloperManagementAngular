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
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in.',
        confirmButtonColor: '#38598b',
      }).then(() => {
        this.router.navigate(['/login']);
      });
    },
    error: (err) => {
      console.error('Registration failed', err);
      this.registrationErrors = {}; // reset

      // لو السيرفر بيرجع errors جوه err.error.errors
      const errorsArray = err.error?.errors;
      if (errorsArray && Array.isArray(errorsArray)) {
        errorsArray.forEach((errorMsg: string) => {
          const lower = errorMsg.toLowerCase();
          if (lower.includes('username')) {
            this.registrationErrors['username'] = errorMsg;
          } else if (lower.includes('email')) {
            this.registrationErrors['email'] = errorMsg;
          } else if (lower.includes('confirm')) {
            this.registrationErrors['confirmPassword'] = errorMsg;
          } else if (lower.includes('password')) {
            this.registrationErrors['password'] = errorMsg;
          } else {
            this.registrationErrors['general'] = errorMsg;
          }
        });
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          html: errorsArray.join('<br>'), // عرض كل الأخطاء
          confirmButtonColor: '#d33',
        });
      } else {
        // لو السيرفر بيرجع message واحد بس أو رسالة غير متوقعة
        const message = err.error?.message || 'An unknown error occurred.';
        this.registrationErrors['general'] = message;
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: message,
          confirmButtonColor: '#d33',
        });
      }
    }
  });
}

}
