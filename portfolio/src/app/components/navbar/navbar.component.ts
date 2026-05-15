import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';
import { ButtonComponent } from '../button/button.component';
import { ElectricPlugComponent } from '../electric-plug/electric-plug.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ElectricPlugComponent, TooltipComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  i18n = inject(I18nService);
  theme = inject(ThemeService);
  isMenuOpen = signal(false);
  isHoveringProjects = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }
}