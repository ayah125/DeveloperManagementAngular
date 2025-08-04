import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.css'],
})
export class WelcomePageComponent implements AfterViewInit {
  constructor(private router:Router){}
  @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/Development Team.json' 

    });
  }
    goTo(route: string) {
    document.body.classList.add('fade-out');  
    setTimeout(() => {
      this.router.navigate([route]);
    }, 1000); 
  }
}
