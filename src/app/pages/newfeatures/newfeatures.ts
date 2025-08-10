import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newfeatures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newfeatures.html',
  styleUrl: './newfeatures.css'
})
export class Newfeatures {
  // Content model for the page
  hero = {
    title: 'Smarter Models. Sharper Outcomes.',
    subtitle:
      'We currently use free open models to power code check, task scoring, and smart assignment. Upgrade to Pro models for higher accuracy, bigger context, and faster insights.'
  };

  proHighlights = [
    {
      icon: 'bi-cpu',
      title: 'Code Check Pro',
      desc: 'Deeper static analysis, larger context windows, and better refactor suggestions for complex repos.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Task Review Pro',
      desc: 'More reliable scores with advanced heuristics calibrated on real-world engineering datasets.'
    },
    {
      icon: 'bi-people',
      title: 'Smart Assign Pro',
      desc: 'Richer skill-matching and workload balancing to recommend the right developer every time.'
    }
  ];

  comparisons = [
    { label: 'Context Window', free: 'Small (short files)', pro: 'Large (multi-file PRs)' },
    { label: 'Accuracy', free: 'Good for basics', pro: 'Great for enterprise repos' },
    { label: 'Latency', free: 'Standard', pro: 'Optimized & snappy' },
    { label: 'Security', free: 'General policies', pro: 'Enterprise guardrails' }
  ];

  price = 100;
  processing = false;
  subscribed = false;

  subscribe(): void {
    if (this.processing) return;
    this.processing = true;
    // Demo-only flow: simulate subscription confirmation
    setTimeout(() => {
      this.subscribed = true;
      this.processing = false;
    }, 900);
  }
}
