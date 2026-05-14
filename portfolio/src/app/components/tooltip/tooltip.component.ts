import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="absolute top-full mt-3 left-1/2 -translate-x-1/2 transition-all duration-300 z-[100]"
      [class.opacity-0]="!show()"
      [class.translate-y-2]="!show()"
      [class.opacity-100]="show()"
      [class.translate-y-0]="show()"
      [class.pointer-events-none]="!show()"
    >
      <div 
        class="relative px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg shadow-xl whitespace-nowrap toon-font"
        [class.hello-animate]="animated() && show()"
      >
        <!-- Small arrow pointing up -->
        <div class="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800 dark:border-b-gray-700"></div>
        
        {{ text() }}
      </div>
    </div>
  `,
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  text = input.required<string>();
  show = input<boolean>(false);
  animated = input<boolean>(true);
}
