// src/app/services/role.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject = new BehaviorSubject<string>('User'); // يبدأ كـ User
  role$ = this.roleSubject.asObservable();

  setRole(newRole: string) {
    this.roleSubject.next(newRole);
    localStorage.setItem('myRole', newRole); // نحفظ في localStorage
  }

  getRole() {
    return this.roleSubject.value;
  }

  loadRole() {
    const savedRole = localStorage.getItem('myRole');
    if (savedRole) {
      this.roleSubject.next(savedRole);
    }
  }
}
