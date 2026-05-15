import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [ngClass]="[
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200',
        size() === 'sm' ? 'text-xs px-2 py-0.5' : '',
        size() === 'md' ? 'text-xs px-2.5 py-1' : '',
        variant() === 'default' ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' : '',
        variant() === 'primary' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : '',
        variant() === 'secondary' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : '',
        variant() === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : '',
        variant() === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : ''
      ]"
    >
      {{ label() }}
    </span>
  `
})
export class SkillChipComponent {
  label = input.required<string>();
  size = input<'sm' | 'md'>('md');
  variant = input<'default' | 'primary' | 'secondary' | 'success' | 'warning'>('default');
}