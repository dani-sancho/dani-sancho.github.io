import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let i18nService: I18nService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [I18nService, ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isMenuOpen signal as false initially', () => {
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should have isHoveringProjects signal as false initially', () => {
    expect(component.isHoveringProjects()).toBe(false);
  });

  it('should toggle menu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should close menu', () => {
    component.isMenuOpen.set(true);
    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should inject I18nService', () => {
    expect(component.i18n).toBeDefined();
  });

  it('should inject ThemeService', () => {
    expect(component.theme).toBeDefined();
  });

  it('should have navigation role', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('role')).toBe('navigation');
  });

  it('should have accessible label for navigation', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should toggle menu on mobile', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-controls')).toBe('nav-menu');
  });
});