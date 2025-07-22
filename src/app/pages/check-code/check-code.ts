import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-check-code',
  imports: [CommonModule],
  templateUrl: './check-code.html',
  styleUrl: './check-code.css',
})
export class CheckCode {
  showResult = false;
  checkCode() {
    this.showResult = true;
  }

  reset() {
    this.showResult = false;
  }
}
