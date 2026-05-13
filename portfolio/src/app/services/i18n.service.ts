import { Injectable, signal, effect } from '@angular/core';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: any;
    es: any;
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
  'about.description': {
    en: 'Frontend developer with 8+ years of experience specializing in Angular, design systems, and frontend architecture. Focused on code quality, scalable solutions, and technical leadership. <br><br>I have evolved from full-stack development to a profile focused on frontend architecture and building scalable solutions for complex environments. I stand out for my focus on code quality, solution standardization, and continuous improvement of technical processes within the team.',
    es: 'Frontend Developer con más de 8 años de experiencia en desarrollo web, especializado en Angular, sistemas de diseño (design systems), escalabilidad frontend y mejora de la experiencia de desarrollo (DX) en equipos. <br><br>He evolucionado desde el desarrollo full stack hacia un perfil enfocado en arquitectura de frontend y construcción de soluciones escalables para entornos complejos. <br><br>Destaco por mi enfoque en la calidad de código, la estandarización de soluciones y la mejora continua de procesos técnicos dentro del equipo.'
  },
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
  'experience.skills.title': { en: 'Skills used', es: 'Habilidades utilizadas' },
  'experience.achievements.title': { en: 'Key achievements', es: 'Logros destacados' },
  'experience.fourvenues.title': { en: 'Senior Frontend Developer', es: 'Desarrollador Frontend Senior' },
  'experience.fourvenues.company': { en: 'Fourvenues', es: 'Fourvenues' },
  'experience.fourvenues.period': { en: 'April 2023 – April 2026', es: 'Abril 2023 – Abril 2026' },
  'experience.fourvenues.description': { en: 'Leadership in the design, evolution, and adoption of an Angular component library used across multiple domains.', es: 'Liderazgo en el diseño, evolución y adopción de una biblioteca de componentes Angular utilizada en múltiples dominios.' },
  'experience.fourvenues.achievements': {
    en: [
      'Led design and implementation of scalable Angular component library adopted across multiple teams',
      'Defined frontend architecture and shared standards focused on scalability, maintainability, and reusability',
      'Designed, versioned, and distributed component library using Git and npm',
      'Designed and implemented internal AI-based agents to assist code migration processes, reducing friction and improving update reliability.',
      'Planned and executed Angular and Tailwind CSS migrations',
      'Conducted code review through Pull Requests, enforcing quality standards',
      'Technical mentoring of junior developers.',
      'Active promotion of Clean Code standards and best practices through collaborative reviews and continuous improvement sessions.'
    ],
    es: [
      'Liderazgo en el diseño e implementación de biblioteca de componentes Angular adoptada por múltiples equipos',
      'Definición de arquitectura frontend y estándares compartidos centrados en escalabilidad, mantenibilidad y reusabilidad',
      'Diseño, versionado y distribución de biblioteca de componentes usando Git y npm',
      'Diseño e implementación de agentes internos basados en IA para asistir procesos de migraciones de código, reduciendo fricción y mejorando la fiabilidad de las actualizaciones.',
      'Planificación y ejecución de migraciones de Angular y Tailwind CSS',
      'Revisión de código mediante Pull Requests, asegurando estándares de calidad',
      'Mentoría técnica de desarrolladores junior.',
      'Promoción activa de estándares de Clean Code mediante revisiones colaborativas y sesiones de mejora continua.'
    ]
  },
  'experience.infortisa.title': { en: 'Full Stack Developer (Frontend focused)', es: 'Desarrollador Full Stack (Frontend focused)' },
  'experience.infortisa.company': { en: 'INFORTISA S.L.', es: 'INFORTISA S.L.' },
  'experience.infortisa.period': { en: 'June 2018 – April 2023', es: 'Junio 2018 – Abril 2023' },
  'experience.infortisa.description': { en: 'Development and maintenance of responsive web applications using Javascript, SCSS and PHP. Tech team leadership. Ionic + Angular for mobile.', es: 'Desarrollo y mantenimiento de aplicaciones web responsivas usando Javascript, SCSS y PHP. Liderazgo de equipo técnico. Ionic + Angular para móvil.' },
  'experience.infortisa.achievements': {
    en: [
      'Built and maintained responsive web applications with Javascript, SCSS and PHP',
      'Implemented backend logic and REST APIs with MySQL/MariaDB databases',
      'Developed mobile applications using Angular + Ionic (plus Cordova/Capacitor when needed)',
      'Designed reusable frontend architecture with components and design patterns',
      'Provided technical leadership in projects and architectural decisions',
      'Mentored junior and mid-level developers',
      'Implemented Git-based workflows with Agile methodologies (Kanban)',
      'Optimized performance and improved accessibility (A11Y) and SEO'
    ],
    es: [
      'Desarrollo y mantenimiento de aplicaciones web responsivas con Javascript, SCSS y PHP',
      'Implementación de lógica backend y APIs REST con bases de datos MySQL/MariaDB',
      'Desarrollo de aplicaciones móviles usando Angular + Ionic (junto con Cordova/Capacitor según necesidad)',
      'Diseño de arquitectura frontend con componentes reutilizables y patrones de diseño',
      'Liderazgo técnico en proyectos y decisiones arquitectónicas',
      'Mentoría a desarrolladores junior y mid-level',
      'Implementación de flujos de trabajo basados en Git con metodologías ágiles (Kanban)',
      'Optimización de rendimiento y mejora de accesibilidad (A11Y) y SEO'
    ]
  },
  'contact.email': { en: 'Email', es: 'Correo' },
  'contact.download_cv': { en: 'Download CV', es: 'Descargar CV' },
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

  t<T = any>(key: string): T {
    const translation = translations[key];
    if (!translation) {
      return key as any;
    }
    return (translation[this.currentLanguage()] || key) as T;
  }
}