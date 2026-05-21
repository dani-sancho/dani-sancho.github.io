import { Component, signal, HostListener, AfterViewInit, OnDestroy, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricSocketComponent } from '../electric-socket/electric-socket.component';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-electric-cable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electric-cable.component.html',
  styleUrl: './electric-cable.component.scss'
})
export class ElectricCableComponent implements AfterViewInit, OnDestroy {
  socket = input<ElectricSocketComponent | null>(null);

  isVisible = signal(false);
  isDragging = signal(false);
  isConnected = signal(false);
  isNear = signal(false);

  dragPosition = signal<Point>({ x: 0, y: 0 });
  anchorPoint = signal<Point>({ x: 0, y: 0 });
  currentRotation = signal(180);
  hasBeenInit = signal<boolean>(false);

  private isDraggingGlobal = false;
  private lastPointerY = 0;
  private lastTargetRotation = 180;
  private animationFrameId: number | null = null;
  private rotationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit() {
    this.hasBeenInit.set(true);
    this.updateAnchorPoint();
    this.dragPosition.set(this.getRestingPosition());

    const navEl = document.querySelector('nav');
    if (navEl) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateAnchorPoint();
        this.snapToCurrentState();
      });
      this.resizeObserver.observe(navEl);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.rotationFrameId) cancelAnimationFrame(this.rotationFrameId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onUpdate() {
    this.updateAnchorPoint();
    if (!this.isDraggingGlobal) {
      this.snapToCurrentState();
    }
  }

  private getNavRect(): DOMRect {
    const navEl = document.querySelector('nav');
    if (navEl) {
      return navEl.getBoundingClientRect();
    }
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  }

  private updateAnchorPoint() {
    const navRect = this.getNavRect();
    this.anchorPoint.set({
      x: navRect.width / 2,
      y: navRect.height
    });
  }

  private getRestingPosition(): Point {
    const anchor = this.anchorPoint();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const dropDistance = scrollY > 10 ? 0 : 60;

    return {
      x: anchor.x - 19.5,
      y: anchor.y + dropDistance
    };
  }

  private getSocketPlugPosition(): Point | null {
    const socketComponent = this.socket();
    if (!socketComponent) return null;

    const socketCenterGlobal = socketComponent.getSocketCenter();
    const navRect = this.getNavRect();

    return {
      x: socketCenterGlobal.x - navRect.left - 19.5 - 1,
      y: socketCenterGlobal.y - navRect.top - 19.5 + 9
    };
  }

  private snapToCurrentState() {
    if (this.isDraggingGlobal) return;

    if (this.isConnected()) {
      const target = this.getSocketPlugPosition();
      if (target) this.animateTo(target);
    } else {
      this.animateTo(this.getRestingPosition());
    }
  }

  private updateRotationState(movingUp?: boolean) {
    // 180 is hanging down naturally (pins point down)
    // 0 is flipped up ready to plug in (pins point up)
    let targetRotation = this.lastTargetRotation;

    if (this.isConnected()) {
      targetRotation = 0;
    } else if (this.isDragging()) {
      if (movingUp === true) {
        targetRotation = 0;
      } else if (movingUp === false) {
        targetRotation = 180;
      }
    } else {
      targetRotation = 180;
    }

    if (targetRotation !== this.lastTargetRotation) {
      this.lastTargetRotation = targetRotation;
      this.animateRotationTo(targetRotation);
    }
  }

  cablePath = computed(() => {
    const anchor = this.anchorPoint();
    const pos = this.dragPosition();
    const angle = this.currentRotation() * Math.PI / 180;

    const startX = anchor.x;
    const startY = anchor.y;

    const cx = pos.x + 19.5;
    const cy = pos.y + 19.5;

    // Calculate the attachment point at the base of the plug.
    // The plug viewBox is 100x100 and scaled to 40x40. Center is at 50,50.
    // The base ends at y=88. The distance from center is 38 units * 0.4 scale = 15.2px.
    // We use a radius of 14px so the cable slightly overlaps under the plug to prevent gaps.
    const endX = cx - 14 * Math.sin(angle);
    const endY = cy + 14 * Math.cos(angle);

    let midX = (startX + endX) / 2;
    const dx = Math.abs(endX - startX);
    const dy = endY - startY;

    const droop = Math.max(30, dx * 0.5 + (dy > 0 ? 0 : -dy * 0.5));
    const midY = Math.max(startY, endY) + droop;

    if (!this.isConnected()) {
      midX -= 1;
    }

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  });

  onPointerDown(event: PointerEvent) {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    event.preventDefault();
    event.stopPropagation();

    this.isDragging.set(true);
    this.isDraggingGlobal = true;

    if (this.isConnected()) {
      const socketComponent = this.socket();
      if (socketComponent) {
        socketComponent.checkConnection({ x: 0, y: 0 });
      }
    }

    this.updateAnchorPoint();

    this.lastPointerY = event.clientY;
    this.updateRotationState();

    const navRect = this.getNavRect();
    this.dragPosition.set({
      x: event.clientX - navRect.left - 19.5,
      y: event.clientY - navRect.top - 19.5
    });

    const onPointerMove = (e: PointerEvent) => {
      if (!this.isDraggingGlobal) return;
      e.preventDefault();

      const currentNavRect = this.getNavRect();
      this.dragPosition.set({
        x: e.clientX - currentNavRect.left - 19.5,
        y: e.clientY - currentNavRect.top - 19.5
      });

      // If we were connected, check if we've dragged far enough to unplug
      if (this.isConnected()) {
        const plugCenterGlobal = this.getPlugCenterGlobal();
        const socketComponent = this.socket();
        if (socketComponent) {
          const socketCenter = socketComponent.getSocketCenter();
          const dist = Math.sqrt(Math.pow(plugCenterGlobal.x - socketCenter.x, 2) + Math.pow(plugCenterGlobal.y - socketCenter.y, 2));
          if (dist > 35) {
            this.isConnected.set(false);
            socketComponent.checkConnection({ x: 0, y: 0 });
          }
        }
      }

      const dy = e.clientY - this.lastPointerY;
      if (Math.abs(dy) > 2) {
        this.updateRotationState(dy < 0);
        this.lastPointerY = e.clientY;
      }

      this.checkProximity();
    };

    const onPointerUp = () => {
      this.isDraggingGlobal = false;
      this.isDragging.set(false);

      const wasConnected = this.checkConnection();
      this.updateRotationState();

      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      if (wasConnected) {
        const target = this.getSocketPlugPosition();
        if (target) this.animateTo(target);
      } else {
        this.animateTo(this.getRestingPosition());
      }
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  private animateTo(target: Point) {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const animate = () => {
      const current = this.dragPosition();
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      this.dragPosition.set({
        x: current.x + dx * 0.25,
        y: current.y + dy * 0.25
      });

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.dragPosition.set({ ...target });
      }
    };

    animate();
  }

  private animateRotationTo(target: number) {
    if (this.rotationFrameId) cancelAnimationFrame(this.rotationFrameId);

    const animate = () => {
      const current = this.currentRotation();
      const diff = target - current;

      this.currentRotation.set(current + diff * 0.2);

      if (Math.abs(diff) > 0.5) {
        this.rotationFrameId = requestAnimationFrame(animate);
      } else {
        this.currentRotation.set(target);
      }
    };

    animate();
  }

  private checkProximity() {
    const socketComponent = this.socket();
    if (!socketComponent) return;

    const plugCenterGlobal = this.getPlugCenterGlobal();
    const isNear = socketComponent.checkProximity(plugCenterGlobal);
    this.isNear.set(isNear);
  }

  private checkConnection(): boolean {
    const socketComponent = this.socket();
    if (!socketComponent) return false;

    const plugCenterGlobal = this.getPlugCenterGlobal();
    const connected = socketComponent.checkConnection(plugCenterGlobal);
    this.isConnected.set(connected);
    this.isNear.set(false);
    return connected;
  }

  private getPlugCenterGlobal(): Point {
    const pos = this.dragPosition();
    const navRect = this.getNavRect();
    return {
      x: pos.x + 19.5 + navRect.left,
      y: pos.y + 19.5 + navRect.top
    };
  }

  setConnected(connected: boolean) {
    this.isConnected.set(connected);
    this.snapToCurrentState();
    this.updateRotationState();
  }
}
