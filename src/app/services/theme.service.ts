import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  
  currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, theme);
      }
      
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    });
  }

  private getInitialTheme(): Theme {
    const storedTheme = typeof localStorage !== 'undefined' 
      ? localStorage.getItem(this.STORAGE_KEY) as Theme | null
      : null;
    
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    
    const prefersDark = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false;
    
    return prefersDark ? 'dark' : 'light';
  }

  toggleTheme(): void {
    this.currentTheme.update(theme => theme === 'light' ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }

  setDark(isDark: boolean): void {
    this.currentTheme.set(isDark ? 'dark' : 'light');
  }
}