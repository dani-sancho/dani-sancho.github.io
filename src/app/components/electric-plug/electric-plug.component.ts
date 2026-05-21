import { Component, signal, viewChild, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricSocketComponent } from './electric-socket/electric-socket.component';
import { ElectricCableComponent } from './electric-cable/electric-cable.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-electric-plug',
  standalone: true,
  imports: [CommonModule, ElectricSocketComponent, ElectricCableComponent, TooltipComponent],
  templateUrl: './electric-plug.component.html',
  styleUrl: './electric-plug.component.scss'
})
export class ElectricPlugComponent implements AfterViewInit {
  i18n = inject(I18nService);
  theme = inject(ThemeService);

  socketComponent = viewChild.required<ElectricSocketComponent>('socket');
  cableComponent = viewChild.required<ElectricCableComponent>('cable');

  isConnected = signal(false);
  isHoveringSocket = signal(false);
  viewInitialized = signal(false);

  constructor() {
    effect(() => {
      if (!this.viewInitialized()) return;

      const isDark = this.theme.currentTheme() === 'dark';
      const shouldBeConnected = !isDark;

      if (this.isConnected() !== shouldBeConnected) {
        this.socketComponent().isConnected.set(shouldBeConnected);
        this.cableComponent().setConnected(shouldBeConnected);
        this.isConnected.set(shouldBeConnected);
      }
    });
  }

  ngAfterViewInit() {
    const isDark = this.theme.currentTheme() === 'dark';

    if (this.cableComponent()) {
      this.cableComponent().isVisible.set(isDark);
    }

    setTimeout(() => {
      this.viewInitialized.set(true);

      if (!isDark) {
        setTimeout(() => {
          if (this.cableComponent()) {
            this.cableComponent().isVisible.set(true);
          }
        }, 150);
      }
    }, 50);
  }

  onConnected(connected: boolean) {
    this.isConnected.set(connected);
    if (this.cableComponent()) {
      this.cableComponent().setConnected(connected);
    }
  }
}
