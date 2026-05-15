import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvComponent } from './cv.component';
import { I18nService } from '../../services/i18n.service';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  let i18nService: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvComponent],
      providers: [I18nService]
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name property', () => {
    expect(component.name).toBe('Daniel Sancho');
  });

  it('should have email property', () => {
    expect(component.email).toBe('d.sancho.23@hotmail.com');
  });

  it('should have telephone property', () => {
    expect(component.telephone).toBe('+34 644 74 34 58');
  });

  it('should have experience array', () => {
    expect(component.experience.length).toBeGreaterThan(0);
  });

  it('should have education array', () => {
    expect(component.education.length).toBeGreaterThan(0);
  });

  it('should have skills object', () => {
    expect(component.skills).toBeDefined();
    expect(component.skills.frontend).toBeDefined();
    expect(component.skills.architecture).toBeDefined();
    expect(component.skills.backend).toBeDefined();
    expect(component.skills.tools).toBeDefined();
  });

  it('should open experience modal', () => {
    const exp = component.experience[0];
    component.openExperience(exp);
    expect(component.isModalOpen()).toBe(true);
    expect(component.selectedExperience()).toBe(exp);
  });

  it('should close modal', () => {
    const exp = component.experience[0];
    component.openExperience(exp);
    component.closeModal();
    expect(component.isModalOpen()).toBe(false);
    expect(component.selectedExperience()).toBeNull();
  });

  it('should render experience items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceCards = compiled.querySelectorAll('[role="button"]');
    expect(experienceCards.length).toBe(component.experience.length);
  });
});