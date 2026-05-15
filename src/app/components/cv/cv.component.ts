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
  telephone = '+34 644 74 34 58';
  linkedin = 'https://www.linkedin.com/in/daniel-sancho-jara/';
  github = 'https://github.com/dani-sancho';
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
    return [
      {
        key: 'fourvenues',
        company: this.i18n.t('experience.fourvenues.company'),
        role: this.i18n.t('experience.fourvenues.title'),
        period: this.i18n.t('experience.fourvenues.period'),
        location: 'Valencia',
        description: this.i18n.t('experience.fourvenues.description'),
        achievements: this.i18n.t<string[]>('experience.fourvenues.achievements'),
        skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Component Library', 'AI Tools', 'Technical Leadership', 'Code Review', 'Mentoring', 'SOLID', 'RXJS', 'SIGNALS', 'CODE REVIEW', 'WEB ACCESSIBILITY', 'KARMA', 'SCRUM', 'TECHNICAL MENTORING', 'NOTION']
      },
      {
        key: 'infortisa',
        company: this.i18n.t('experience.infortisa.company'),
        role: this.i18n.t('experience.infortisa.title'),
        period: this.i18n.t('experience.infortisa.period'),
        location: 'Valencia',
        description: this.i18n.t('experience.infortisa.description'),
        achievements: this.i18n.t<string[]>('experience.infortisa.achievements'),
        skills: ['JavaScript', 'Angular', 'TypeScript', 'SCSS', 'HTML', 'CSS', 'Responsive Web Design', 'PHP', 'API REST', 'Kanban', 'Deployment', 'Leadership', 'Mentorship', 'Optimización', 'SEO', 'Accesibilidad', 'Ionic', 'MySQL', 'MariaDB']
      }
    ];


  }

  education = [
    {
      degree: this.i18n.t('education.daw.title'),
      institution: 'IES Conselleria, Valencia',
      period: '(2017 - 2018)',
    },
    {
      degree: this.i18n.t('education.smr.title'),
      institution: 'IES Conselleria, Valencia',
      period: '(2014 - 2016)',
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