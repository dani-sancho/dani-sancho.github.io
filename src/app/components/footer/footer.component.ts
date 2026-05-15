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
  
  email = 'd.sancho.23@hotmail.com';
  telephone = '+34 644 74 34 58';
  linkedin = 'https://www.linkedin.com/in/daniel-sancho-jara/';
  github = 'https://github.com/dani-sancho';
  
  currentYear = new Date().getFullYear();
}