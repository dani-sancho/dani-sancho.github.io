import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricPlugComponent } from './electric-plug.component';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

describe('ElectricPlugComponent', () => {
  let component: ElectricPlugComponent;
  let fixture: ComponentFixture<ElectricPlugComponent>;
  let i18nService: I18nService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricPlugComponent],
      providers: [I18nService, ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(ElectricPlugComponent);
    component = fixture.componentInstance;
    i18nService = TestBed.inject(I18nService);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isConnected signal as false initially', () => {
    expect(component.isConnected()).toBe(false);
  });

  it('should have isHoveringSocket signal as false initially', () => {
    expect(component.isHoveringSocket()).toBe(false);
  });

  it('should inject I18nService', () => {
    expect(component.i18n).toBeDefined();
  });

  it('should inject ThemeService', () => {
    expect(component.theme).toBeDefined();
  });

  it('should have socket component', () => {
    expect(component.socketComponent()).toBeDefined();
  });

  it('should have cable component', () => {
    expect(component.cableComponent()).toBeDefined();
  });
});