import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { I18nService } from '../../services/i18n.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let i18nService: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [I18nService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects array', () => {
    expect(component.projects.length).toBeGreaterThan(0);
  });

  it('should have 6 projects', () => {
    expect(component.projects.length).toBe(6);
  });

  it('should have project with id', () => {
    const project = component.projects[0];
    expect(project.id).toBe(1);
  });

  it('should have project with title', () => {
    const project = component.projects[0];
    expect(project.title).toBe('Angular Component Library');
  });

  it('should have project with description', () => {
    const project = component.projects[0];
    expect(project.description).toBeDefined();
  });

  it('should have project with techStack', () => {
    const project = component.projects[0];
    expect(project.techStack.length).toBeGreaterThan(0);
  });

  it('should have project with githubUrl', () => {
    const project = component.projects[0];
    expect(project.githubUrl).toBeDefined();
  });

  it('should render all projects', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const articles = compiled.querySelectorAll('article');
    expect(articles.length).toBe(component.projects.length);
  });

  it('should have proper project structure', () => {
    component.projects.forEach(project => {
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.techStack).toBeDefined();
    });
  });
});