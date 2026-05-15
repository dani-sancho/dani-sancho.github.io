import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';
import { ButtonComponent } from '../button/button.component';
import { ElectricPlugComponent } from '../electric-plug/electric-plug.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent, ElectricPlugComponent, TooltipComponent],
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
}