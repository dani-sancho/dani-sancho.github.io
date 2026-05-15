import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { I18nService } from '../../services/i18n.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let i18nService: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [I18nService]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email', () => {
    expect(component.email).toBe('d.sancho.23@hotmail.com');
  });

  it('should have telephone', () => {
    expect(component.telephone).toBe('+34 644 74 34 58');
  });

  it('should have linkedin URL', () => {
    expect(component.linkedin).toBe('https://www.linkedin.com/in/daniel-sancho-jara/');
  });

  it('should have github URL', () => {
    expect(component.github).toBe('https://github.com/dani-sancho');
  });

  it('should have current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should have footer element', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('should have phone button with aria-label', () => {
    const phoneButton = fixture.nativeElement.querySelector('a[aria-label="Phone"]');
    expect(phoneButton).toBeTruthy();
  });

  it('should have email button with aria-label', () => {
    const emailButton = fixture.nativeElement.querySelector('a[aria-label="Email"]');
    expect(emailButton).toBeTruthy();
  });

  it('should have LinkedIn button with aria-label', () => {
    const linkedinButton = fixture.nativeElement.querySelector('a[aria-label="LinkedIn"]');
    expect(linkedinButton).toBeTruthy();
  });

  it('should have GitHub button with aria-label', () => {
    const githubButton = fixture.nativeElement.querySelector('a[aria-label="GitHub"]');
    expect(githubButton).toBeTruthy();
  });
});