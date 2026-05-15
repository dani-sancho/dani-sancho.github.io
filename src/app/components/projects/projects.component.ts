import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  i18n = inject(I18nService);

  projects: Project[] = [
    {
      id: 1,
      title: 'Angular Component Library',
      description: 'Scalable component library distributed via npm, adopted across multiple teams and domains.',
      techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'Storybook'],
      githubUrl: 'https://github.com/danisancho/components'
    },
    {
      id: 2,
      title: 'AI Migration Tools',
      description: 'Internal tools to assist Angular migrations and upgrades using AI, improving reliability and reducing friction.',
      techStack: ['Angular', 'Node.js', 'OpenAI API', 'Python']
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce solution with cart, checkout, and admin dashboard.',
      techStack: ['Angular', 'PHP', 'MySQL', 'Stripe'],
      githubUrl: 'https://github.com/danisancho/ecommerce'
    },
    {
      id: 4,
      title: 'Mobile App (Ionic)',
      description: 'Cross-platform mobile application for inventory management with offline capabilities.',
      techStack: ['Angular', 'Ionic', 'Capacitor', 'SQLite'],
      githubUrl: 'https://github.com/danisancho/inventory-app'
    },
    {
      id: 5,
      title: 'Real-time Chat App',
      description: 'Collaborative chat application with rooms, file sharing, and notifications.',
      techStack: ['Node.js', 'Socket.io', 'MongoDB', 'Redis'],
      githubUrl: 'https://github.com/danisancho/chat'
    },
    {
      id: 6,
      title: 'Portfolio Generator',
      description: 'CLI tool to generate static portfolios from markdown configuration files.',
      techStack: ['Node.js', 'Handlebars', 'Markdown'],
      githubUrl: 'https://github.com/danisancho/portfolio-gen'
    }
  ];
}