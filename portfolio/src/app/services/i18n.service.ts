import { Injectable, signal, effect } from '@angular/core';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.projects': { en: 'Projects', es: 'Proyectos' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'hero.greeting': { en: "Hi, I'm", es: 'Hola, soy' },
  'hero.role': { en: 'Senior Frontend Developer', es: 'Desarrollador Frontend Senior' },
  'hero.tagline': { en: '+8 years of experience. <span class="text-indigo-500">Focused on Angular</span> and Design Systems. Specialized in code quality, scalable architectures and team mentorship.', es: '+8 años de experiencia. <span class="text-indigo-500">Enfocado en Angular</span> y Sistemas de Diseño. Especializado en calidad de código, arquitecturas escalables y mentorship de equipos.' },
  'about.title': { en: 'About Me', es: 'Sobre Mí' },
  'about.description': { en: 'Frontend developer with 8+ years of experience specializing in Angular, design systems, and frontend architecture. Focused on code quality, scalable solutions, and technical leadership.', es: 'Desarrollador frontend con más de 8 años de experiencia especializado en Angular, sistemas de diseño y arquitectura frontend. Enfocado en calidad de código, soluciones escalables y liderazgo técnico.' },
  'skills.title': { en: 'Skills', es: 'Habilidades' },
  'experience.title': { en: 'Experience', es: 'Experiencia' },
  'education.title': { en: 'Education', es: 'Educación' },
  'projects.title': { en: 'My Projects', es: 'Mis Proyectos' },
  'projects.viewCode': { en: 'Code', es: 'Código' },
  'projects.liveDemo': { en: 'Demo', es: 'Demo' },
  'contact.title': { en: 'Get In Touch', es: 'Contacto' },
  'footer.copyright': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  'theme.toggle': { en: 'Toggle theme', es: 'Cambiar tema' },
  'language.toggle': { en: 'Switch to Spanish', es: 'Cambiar a Inglés' },
  'experience.fourvenues.title': { en: 'Senior Frontend Developer', es: 'Desarrollador Frontend Senior' },
  'experience.fourvenues.company': { en: 'Fourvenues', es: 'Fourvenues' },
  'experience.fourvenues.period': { en: 'April 2023 – April 2026', es: 'Abril 2023 – Abril 2026' },
  'experience.fourvenues.description': { en: 'Leadership in the design, evolution, and adoption of an Angular component library used across multiple domains.', es: 'Liderazgo en el diseño, evolución y adopción de una biblioteca de componentes Angular utilizada en múltiples dominios.' },
  'experience.infortisa.title': { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
  'experience.infortisa.company': { en: 'INFORTISA S.L.', es: 'INFORTISA S.L.' },
  'experience.infortisa.period': { en: 'June 2018 – April 2023', es: 'Junio 2018 – Abril 2023' },
  'experience.infortisa.description': { en: 'Development and maintenance of responsive web applications using Angular and PHP.', es: 'Desarrollo y mantenimiento de aplicaciones web responsivas usando Angular y PHP.' },
  'contact.email': { en: 'Email', es: 'Correo' },
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly STORAGE_KEY = 'portfolio-language';

  currentLanguage = signal<Language>(this.getInitialLanguage());

  constructor() {
    effect(() => {
      const lang = this.currentLanguage();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, lang);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    });
  }

  private getInitialLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'en' || stored === 'es') {
        return stored;
      }
    }

    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'es' ? 'es' : 'en';
    }

    return 'en';
  }

  toggleLanguage(): void {
    this.currentLanguage.update(lang => lang === 'en' ? 'es' : 'en');
  }

  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      return key;
    }
    return translation[this.currentLanguage()] || key;
  }
}