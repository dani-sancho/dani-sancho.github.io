import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render modal when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(modal).toBeFalsy();
  });

  it('should render modal when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(modal).toBeTruthy();
  });

  it('should display title', () => {
    component.isOpen = true;
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Title');
  });

  it('should display subtitle', () => {
    component.isOpen = true;
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Subtitle');
  });

  it('should emit closed event on close', () => {
    spyOn(component.closed, 'emit');
    component.isOpen = true;
    component.title = 'Test';
    component.subtitle = 'Test';
    fixture.detectChanges();
    
    component.close();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should close on escape key', fakeAsync(() => {
    spyOn(component.closed, 'emit');
    component.isOpen = true;
    component.title = 'Test';
    fixture.detectChanges();
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    tick();
    
    expect(component.isOpen).toBe(false);
  }));

  it('should have proper ARIA attributes', () => {
    component.isOpen = true;
    component.title = 'Test Modal';
    fixture.detectChanges();
    
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-label')).toBe('Test Modal');
  });
});