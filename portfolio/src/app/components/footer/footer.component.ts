import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  i18n = inject(I18nService);
  
  currentYear = new Date().getFullYear();
}