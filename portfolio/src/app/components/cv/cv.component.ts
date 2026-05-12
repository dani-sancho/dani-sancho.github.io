import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

interface Experience {
  key: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements?: string[];
}

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
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
    frontend: ['Angular', 'TypeScript', 'Tailwind CSS', 'React', 'SCSS', 'HTML5'],
    architecture: ['Design Systems', 'Component Libraries', 'SOLID', 'Clean Code'],
    backend: ['REST APIs', 'PHP', 'MySQL', 'Node.js'],
    tools: ['Git', 'npm', 'CI/CD', 'Figma', 'Notion']
  };

  get experience(): Experience[] {
    const lang = this.i18n.currentLanguage();
    return [
      {
        key: 'fourvenues',
        company: this.i18n.t('experience.fourvenues.company'),
        role: this.i18n.t('experience.fourvenues.title'),
        period: this.i18n.t('experience.fourvenues.period'),
        description: this.i18n.t('experience.fourvenues.description'),
        achievements: lang === 'en' ? [
          'Led design and implementation of scalable Angular component library',
          'Defined frontend architecture and shared standards for scalability',
          'Developed AI-based tools for migration and upgrade processes',
          'Technical mentoring of 10+ developers',
          'Code review and quality standards enforcement'
        ] : [
          'Liderazgo en el diseño e implementación de biblioteca de componentes Angular',
          'Definición de arquitectura frontend y estándares compartidos',
          'Herramientas basadas en IA para procesos de migración',
          'Mentoría técnica de más de 10 desarrolladores',
          'Revisión de código y aplicación de estándares de calidad'
        ]
      },
      {
        key: 'infortisa',
        company: this.i18n.t('experience.infortisa.company'),
        role: this.i18n.t('experience.infortisa.title'),
        period: this.i18n.t('experience.infortisa.period'),
        description: this.i18n.t('experience.infortisa.description'),
        achievements: lang === 'en' ? [
          'Built full-stack applications with Angular + PHP',
          'REST API development with MySQL/MariaDB',
          'Mobile apps with Angular + Ionic (Cordova/Capacitor)',
          'Component-based architecture design and reuse',
          'Technical leadership in projects'
        ] : [
          'Aplicaciones full-stack con Angular + PHP',
          'Desarrollo de API REST con MySQL/MariaDB',
          'Apps móviles con Angular + Ionic (Cordova/Capacitor)',
          'Diseño de arquitectura basada en componentes',
          'Liderazgo técnico en proyectos'
        ]
      }
    ];
  }

  education = [
    {
      institution: 'Computer Science',
      degree: 'Technical Engineering',
      period: '2014 – 2018'
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