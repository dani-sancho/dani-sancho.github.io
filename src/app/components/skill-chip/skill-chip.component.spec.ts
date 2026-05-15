import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillChipComponent } from './skill-chip.component';

describe('SkillChipComponent', () => {
  let component: SkillChipComponent;
  let fixture: ComponentFixture<SkillChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Skill');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default variant as default', () => {
    expect(component.variant()).toBe('default');
  });

  it('should have default size', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default variant', () => {
    expect(component.variant()).toBe('default');
  });
});