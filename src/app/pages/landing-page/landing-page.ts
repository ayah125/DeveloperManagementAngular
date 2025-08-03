import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../../Shared Component/navbar/navbar';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

  constructor(private router: Router) {}

  features = [
    {
      icon: 'fab fa-github',
      title: 'GitHub Integration',
      description: 'Seamlessly connect with your GitHub repositories to track all branch activities and commits.'
    },
    {
      icon: 'fas fa-code-branch',
      title: 'Commit Rating System',
      description: 'Automatically rate each commit based on code quality, impact, and collaboration metrics within branches.'
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Developer Performance',
      description: 'Comprehensive developer rating system based on commit history, code reviews, and team feedback in workspaces.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics Dashboard',
      description: 'Visualize team performance with detailed analytics and actionable insights for better decision-making.'
    }
  ];

  benefits = [
    {
      icon: 'fas fa-tachometer-alt',
      title: 'Enhanced Productivity',
      description: 'Improve team efficiency by identifying top performers and areas for improvement.'
    },
    {
      icon: 'fas fa-code',
      title: 'Code Quality Insights',
      description: 'Gain valuable insights into code quality trends and maintain consistent standards.'
    },
    {
      icon: 'fas fa-users',
      title: 'Team Collaboration',
      description: 'Foster better collaboration with transparent performance metrics and feedback.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to protect your code and development data.'
    }
  ];

  steps = [
    {
      number: 1,
      title: 'Create a Workspace',
      description: 'Set up your first workspace to organize your team and projects.'
    },
    {
      number: 2,
      title: 'Connect Your GitHub',
      description: 'Authorize our platform to access your organization\'s repositories and track development activities.'
    },
    {
      number: 3,
      title: 'Configure Your Team',
      description: 'Set up your team members and assign them to specific projects and workspaces.'
    },
    {
      number: 4,
      title: 'Track & Rate',
      description: 'Monitor commits, branches, and rate developer performance within their workspaces.'
    },
    {
      number: 5,
      title: 'Optimize Performance',
      description: 'Use insights to enhance your team\'s productivity, code quality, and collaboration.'
    }
  ];

  // New professional features
  professionalFeatures = [
    {
      icon: 'fas fa-sync-alt',
      title: 'Real-time Sync',
      description: 'Instant synchronization with GitHub repositories for up-to-date metrics.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Smart Notifications',
      description: 'Customizable alerts for important events and performance milestones.'
    },
    {
      icon: 'fas fa-file-code',
      title: 'Code Review Insights',
      description: 'Detailed analysis of code review patterns and quality metrics.'
    },
    {
      icon: 'fas fa-project-diagram',
      title: 'Project Visualization',
      description: 'Interactive charts and graphs to visualize project progress and team contributions.'
    }
  ];

  // Contact information
  contactInfo = {
    email: 'support@teammanagement.com',
    phone: '+1 (555) 123-4567',
    address: '123 Developer Lane, Tech City, TC 10001'
  };

  // Contact form model
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  // Social media links
  socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
    { name: 'GitHub', icon: 'fab fa-github', url: '#' }
  ];

  navigateToSignup() {
    this.router.navigate(['/register']);
  }

  navigateToDemo() {
    // For now, we can navigate to a demo page or just to the home page
    // You can adjust this as needed
    this.router.navigate(['/home']);
  }

  navigateToCreateWorkspace() {
    this.router.navigate(['/create']);
  }

  onSubmitContactForm() {
    // Placeholder for contact form submission
    console.log('Contact form submitted', this.contactForm);
    // In a real application, you would send this data to your backend
    // Reset form after submission
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }
}
