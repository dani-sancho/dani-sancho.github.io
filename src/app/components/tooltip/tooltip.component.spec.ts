import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Tooltip');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default show as false', () => {
    expect(component.show()).toBe(false);
  });

  it('should have default animated as false', () => {
    expect(component.animated()).toBe(false);
  });

  it('should have default properties', () => {
    expect(component.show()).toBe(false);
    expect(component.animated()).toBe(false);
  });
});