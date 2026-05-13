import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';
import { SkillChipComponent } from '../skill-chip/skill-chip.component';

interface Experience {
  key: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent, SkillChipComponent],
  templateUrl: './cv.component.html'
})
export class CvComponent {
  i18n = inject(I18nService);

  name = 'Daniel Sancho';
  email = 'd.sancho.23@hotmail.com';
  linkedin = 'https://www.linkedin.com/in/daniel-sancho-jara/';
  github = 'github.com/danisancho';
  imageSize = 80;

  selectedExperience = signal<Experience | null>(null);
  isModalOpen = signal(false);

  skills = {
    frontend: ['Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SCSS', 'HTML5'],
    architecture: ['Design Systems', 'Component Libraries', 'Frontend Architecture', 'SOLID', 'Clean Code'],
    backend: ['REST APIs', 'PHP', 'MySQL', 'MariaDB', 'Node.js'],
    tools: ['Git', 'npm', 'CI/CD', 'Figma', 'Notion', 'Scrum', 'Kanban']
  };

  get experience(): Experience[] {
    const lang = this.i18n.currentLanguage();
    return [
      {
        key: 'fourvenues',
        company: 'Fourvenues',
        role: 'Senior Frontend Developer',
        period: 'April 2023 – April 2026',
        location: 'Valencia',
        description: 'Leadership in the design, evolution, and adoption of an Angular component library used across multiple domains.',
        achievements: [
          'Led design and implementation of scalable Angular component library adopted across multiple teams',
          'Defined frontend architecture and shared standards focused on scalability, maintainability, and reusability',
          'Designed, versioned, and distributed component library using Git and npm',
          'Developed internal AI-based tools to assist migration and upgrade processes',
          'Planned and executed Angular and Tailwind CSS migrations',
          'Conducted code review through Pull Requests, enforcing quality standards',
          'Technical mentoring of junior developers (10+)'
        ],
        skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Component Library', 'AI Tools', 'Technical Leadership', 'Code Review', 'Mentoring']
      },
      {
        key: 'infortisa',
        company: 'INFORTISA S.L.',
        role: 'Full Stack Developer',
        period: 'June 2018 – April 2023',
        location: 'Valencia',
        description: 'Development and maintenance of responsive web applications using Angular and PHP.',
        achievements: [
          'Built and maintained responsive web applications with Angular and PHP',
          'Implemented backend logic and REST APIs with MySQL/MariaDB databases',
          'Developed mobile applications using Angular + Ionic (Cordova/Capacitor)',
          'Designed component-based frontend architecture for reuse strategies',
          'Provided technical leadership in projects and architectural decisions',
          'Mentored junior and mid-level developers',
          'Implemented Git-based workflows with Agile methodologies (Scrum/Kanban)',
          'Optimized performance and improved accessibility (A11Y) and SEO'
        ],
        skills: ['Angular', 'PHP', 'MySQL', 'MariaDB', 'Ionic', 'Cordova', 'REST APIs', 'Responsive Design', 'A11Y', 'SEO', 'Scrum', 'Kanban']
      }
    ];
  }

  education = [
    {
      institution: 'Technical Engineering in Computer Science',
      degree: 'Computer Science Degree',
      period: '2014 – 2018',
      location: 'Valencia'
    }
  ];

  openExperience(exp: Experience) {
    this.selectedExperience.set(exp);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedExperience.set(null);
  }
}