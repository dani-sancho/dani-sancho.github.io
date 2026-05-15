import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language', () => {
    const lang = service.currentLanguage();
    expect(lang === 'en' || lang === 'es').toBe(true);
  });

  it('should toggle language', () => {
    const initialLang = service.currentLanguage();
    service.toggleLanguage();
    expect(service.currentLanguage()).not.toBe(initialLang);
  });

it('should translate key in English', () => {
    service.currentLanguage.set('en');
    const translation = service.t('nav.home');
    expect(translation).toBe('Home');
  });

  it('should translate key in Spanish', () => {
    service.currentLanguage.set('es');
    const translation = service.t('nav.home');
    expect(translation).toBe('Inicio');
  });

  it('should return key if translation not found', () => {
    const translation = service.t('nonexistent.key');
    expect(translation).toBe('nonexistent.key');
  });

it('should return array for array keys', () => {
    service.currentLanguage.set('en');
    const achievements = service.t<string[]>('experience.fourvenues.achievements');
    expect(Array.isArray(achievements)).toBe(true);
  });

  it('should persist language to localStorage', () => {
    service.currentLanguage.set('es');
    TestBed.tick();
    const stored = localStorage.getItem('portfolio-language');
    expect(stored).toBe('es');
  });

  it('should detect browser language', () => {
    localStorage.clear();
    const newService = TestBed.inject(I18nService);
    const lang = newService.currentLanguage();
    expect(lang === 'en' || lang === 'es').toBe(true);
  });
});