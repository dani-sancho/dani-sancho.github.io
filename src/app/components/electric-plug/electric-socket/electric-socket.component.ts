import { Component, inject, signal, output, HostListener, AfterViewInit, OnDestroy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-electric-socket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electric-socket.component.html'
})
export class ElectricSocketComponent implements AfterViewInit, OnDestroy {
  theme = inject(ThemeService);
  isDragging = input(false);
  
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
    if (this.isDragging()) {
      this.isNear.set(false);
      return false;
    }
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
    if (this.isDragging()) return;
    this.isNear.set(true);
    this.near.emit(true);
  }

  onPointerLeave() {
    if (this.isDragging()) return;
    if (!this.isConnected()) {
      this.isNear.set(false);
      this.near.emit(false);
    }
  }
}
