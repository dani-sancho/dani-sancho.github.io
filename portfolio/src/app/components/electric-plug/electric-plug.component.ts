import { Component, signal, ViewChild, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricSocketComponent } from './electric-socket.component';
import { ElectricCableComponent } from './electric-cable.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-electric-plug',
  standalone: true,
  imports: [CommonModule, ElectricSocketComponent, ElectricCableComponent, TooltipComponent],
  template: `
    <div class="flex items-center h-full gap-3">
      <div 
        class="relative flex items-center justify-center"
        (mouseenter)="isHoveringSocket.set(true)"
        (mouseleave)="isHoveringSocket.set(false)"
      >
        <app-electric-socket #socket (connected)="onConnected($event)"></app-electric-socket>
        
        <app-tooltip 
          [text]="i18n.t('theme.plug.tooltip.light')" 
          [show]="isHoveringSocket() && !cable.isDragging() && !cable.isConnected()"
        ></app-tooltip>
      </div>
      <app-electric-cable #cable [socket]="socketComponent"></app-electric-cable>
    </div>
  `,
  styleUrl: './electric-plug.component.scss'
})
export class ElectricPlugComponent implements AfterViewInit {
  i18n = inject(I18nService);
  theme = inject(ThemeService);
  
  @ViewChild('socket') socketComponent!: ElectricSocketComponent;
  @ViewChild('cable') cableComponent!: ElectricCableComponent;
  
  isConnected = signal(false);
  isHoveringSocket = signal(false);
  viewInitialized = signal(false);

  constructor() {
    effect(() => {
      // Re-run when view is ready and when theme changes
      if (!this.viewInitialized()) return;
      
      const isDark = this.theme.currentTheme() === 'dark';
      const shouldBeConnected = !isDark;
      
      if (this.isConnected() !== shouldBeConnected) {
        this.socketComponent.isConnected.set(shouldBeConnected);
        this.cableComponent.setConnected(shouldBeConnected);
        this.isConnected.set(shouldBeConnected);
      }
    });
  }

  ngAfterViewInit() {
    const isDark = this.theme.currentTheme() === 'dark';
    
    // If dark mode, cable is visible immediately. If light mode, hide it initially.
    if (this.cableComponent) {
      this.cableComponent.isVisible.set(isDark);
    }

    // Delay to let DOM layout settle so coordinates are calculated correctly
    setTimeout(() => {
      this.viewInitialized.set(true);
      
      if (!isDark) {
        // For light mode, fade it in after it has snapped to the socket
        setTimeout(() => {
          if (this.cableComponent) {
            this.cableComponent.isVisible.set(true);
          }
        }, 150);
      }
    }, 50);
  }

  onConnected(connected: boolean) {
    this.isConnected.set(connected);
    if (this.cableComponent) {
      this.cableComponent.setConnected(connected);
    }
    // Note: electric-socket handles updating the theme, which will trigger the effect again,
    // but the `if (this.isConnected() !== shouldBeConnected)` guard will prevent infinite loops.
  }
}