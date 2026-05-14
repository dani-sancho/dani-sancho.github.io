import { Component, inject, signal, output, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-electric-socket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="relative flex-shrink-0"
      [class.scale-105]="isNear()"
      [class.scale-110]="isConnected()"
      [class.cursor-help]="!isConnected()"
      (pointerenter)="onPointerEnter()"
      (pointerleave)="onPointerLeave()"
    >
      <svg width="40" height="40" class="w-10 h-10" viewBox="0 0 120 120" fill="none">
        <!-- Outer plate -->
        <rect x="10" y="10" width="100" height="100" rx="24" 
          [attr.fill]="isConnected() ? '#dcfce7' : '#ECECEC'"
          [attr.stroke]="isConnected() ? '#86efac' : '#CFCFCF'" 
          stroke-width="4"/>
        <!-- Inner socket area -->
        <circle cx="60" cy="60" r="32" 
          [attr.fill]="isConnected() ? '#bbf7d0' : '#DCDCDC'" 
          [attr.stroke]="isConnected() ? '#86efac' : '#BEBEBE'" 
          stroke-width="3"/>
        <!-- Left hole -->
        <circle cx="48" cy="60" r="5" 
          [class]="isConnected() ? 'fill-green-600' : (isNear() ? 'fill-yellow-500' : 'fill-gray-600')"/>
        <!-- Right hole -->
        <circle cx="72" cy="60" r="5" 
          [class]="isConnected() ? 'fill-green-600' : (isNear() ? 'fill-yellow-500' : 'fill-gray-600')"/>
        <!-- Ground clips -->
        <rect x="56" y="30" width="8" height="8" rx="2" fill="#999"/>
        <rect x="56" y="82" width="8" height="8" rx="2" fill="#999"/>
      </svg>
      <div #socketElement class="absolute inset-0" [attr.data-socket]="true"></div>
    </div>
  `
})
export class ElectricSocketComponent implements AfterViewInit, OnDestroy {
  theme = inject(ThemeService);
  
  connected = output<boolean>();
  near = output<boolean>();
  
  isConnected = signal(false);
  isNear = signal(false);
  
  private socketRect: DOMRect | null = null;
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit() {
    this.updateSocketRect();
    
    this.resizeObserver = new ResizeObserver(() => {
      this.updateSocketRect();
    });
    
    const socketEl = document.querySelector('[data-socket]');
    if (socketEl) {
      this.resizeObserver.observe(socketEl);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onUpdate() {
    this.updateSocketRect();
  }

  private updateSocketRect() {
    const socketEl = document.querySelector('[data-socket]');
    if (socketEl) {
      this.socketRect = socketEl.getBoundingClientRect();
    }
  }

  getSocketCenter(): { x: number; y: number } {
    this.updateSocketRect();
    if (this.socketRect) {
      return {
        x: this.socketRect.left + this.socketRect.width / 2,
        y: this.socketRect.top + this.socketRect.height / 2
      };
    }
    return { x: 0, y: 0 };
  }

  checkConnection(plugCenter: { x: number; y: number }): boolean {
    const socket = this.getSocketCenter();
    const distance = Math.sqrt(
      Math.pow(plugCenter.x - socket.x, 2) + 
      Math.pow(plugCenter.y - socket.y, 2)
    );
    
    const connected = distance < 35;
    const wasConnected = this.isConnected();
    
    if (connected !== wasConnected) {
      this.isConnected.set(connected);
      this.connected.emit(connected);
      
      this.theme.setDark(!connected);
    }
    
    return connected;
  }

  checkProximity(plugCenter: { x: number; y: number }): boolean {
    const socket = this.getSocketCenter();
    const distance = Math.sqrt(
      Math.pow(plugCenter.x - socket.x, 2) + 
      Math.pow(plugCenter.y - socket.y, 2)
    );
    
    const isNear = distance < 50 && distance >= 35;
    const wasNear = this.isNear();
    
    if (isNear !== wasNear) {
      this.isNear.set(isNear);
      this.near.emit(isNear);
    }
    
    return isNear;
  }

  onPointerEnter() {
    this.isNear.set(true);
    this.near.emit(true);
  }

  onPointerLeave() {
    if (!this.isConnected()) {
      this.isNear.set(false);
      this.near.emit(false);
    }
  }
}