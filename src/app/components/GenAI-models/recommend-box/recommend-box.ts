import { Component } from '@angular/core';
import { Recommend } from '../../../services/recommend/recommend';

@Component({
  selector: 'app-recommend-box',
  imports: [],
  templateUrl: './recommend-box.html',
  styleUrl: './recommend-box.css'
})
export class RecommendBox {

  description: string = '';
  result: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private recommendService: Recommend) {}

  getRecommendation() {
    if (!this.description.trim()) {
      this.error = 'Please enter a description.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.recommendService.getRecommendations(this.description).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching recommendations.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
