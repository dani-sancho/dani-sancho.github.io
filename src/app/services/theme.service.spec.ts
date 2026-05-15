import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default theme', () => {
    const theme = service.currentTheme();
    expect(theme === 'light' || theme === 'dark').toBe(true);
  });

  it('should toggle theme', () => {
    const initialTheme = service.currentTheme();
    service.toggleTheme();
    expect(service.currentTheme()).not.toBe(initialTheme);
  });

  it('should check if dark mode', () => {
    const isDark = service.isDark();
    expect(typeof isDark).toBe('boolean');
  });

  it('should set dark theme', () => {
    service.setDark(true);
    expect(service.currentTheme()).toBe('dark');
  });

  it('should set light theme', () => {
    service.setDark(false);
    expect(service.currentTheme()).toBe('light');
  });

  it('should persist theme to localStorage', () => {
    service.setDark(true);
    TestBed.tick();
    const stored = localStorage.getItem('portfolio-theme');
    expect(stored).toBe('dark');
  });
});