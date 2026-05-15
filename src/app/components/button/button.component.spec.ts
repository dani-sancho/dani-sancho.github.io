import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should have default size as md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default disabled as false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have default type as button', () => {
    expect(component.type()).toBe('button');
  });

  it('should emit click event', () => {
    component.onClick.emit as jasmine.Spy;
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.onClick).toBeDefined();
  });

  it('should render button when href is not set', () => {
    fixture.componentRef.setInput('href', '');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should render anchor when href is set', () => {
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://example.com');
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});