import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'icon';

interface VariantStyles {
  base: string;
  hover: string;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    @if (href()) {
      <a
        [href]="href()"
        [target]="target() || '_self'"
        [rel]="target() === '_blank' ? 'noopener noreferrer' : ''"
        [class]="classes()"
        [attr.aria-label]="ariaLabel()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        (click)="onClick.emit($event)"
        [class]="classes()"
        [attr.aria-label]="ariaLabel()"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    }
  `
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  href = input('');
  target = input('');
  type = input<'button' | 'submit' | 'reset'>('button');
  isFullWidth = input(false);
  ariaLabel = input<string>('');
  onClick = output<MouseEvent>();

  private isDark = computed(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  classes = computed(() => {
    const base = `inline-flex items-center justify-center font-semibold transition-all duration-200
    whitespace-nowrap text-ellipsis overflow-hidden  
    focus:outline-none focus-visible:ring-2 
    focus-visible:ring-indigo-500 focus-visible:ring-offset-2`;
    const disabledClass = this.disabled() ? ' opacity-50 cursor-not-allowed' : '';

    const variantStyles = this.getVariantStyles();
    const sizeStyles = this.getSizeStyles();
    const fullWidthClass = this.isFullWidth() ? ' w-full' : '';

    return `${base} ${variantStyles.base} ${variantStyles.hover} ${sizeStyles} ${disabledClass} ${fullWidthClass}`;
  });

  private getVariantStyles(): VariantStyles {
    const dark = this.isDark();
    const v = this.variant();

    const variantMap: Record<ButtonVariant, { light: VariantStyles; dark: VariantStyles }> = {
      primary: {
        light: { base: ' bg-indigo-500 text-white border border-transparent', hover: ' hover:bg-indigo-600 active:bg-indigo-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg rounded-lg' },
        dark: { base: ' bg-indigo-500 text-white border border-transparent', hover: ' hover:bg-indigo-600 active:bg-indigo-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg rounded-lg' }
      },
      secondary: {
        light: { base: ' bg-white border border-gray-300 text-gray-700', hover: ' hover:bg-gray-50 hover:border-gray-400 rounded-lg' },
        dark: { base: ' bg-gray-800 border border-gray-600 text-gray-200', hover: ' hover:bg-gray-700 hover:border-gray-500 rounded-lg' }
      },
      icon: {
        light: { base: ' bg-gray-100 border border-gray-200 text-gray-600', hover: ' hover:bg-gray-200 hover:text-indigo-500 rounded-lg' },
        dark: { base: ' bg-gray-800 border border-gray-700 text-gray-300', hover: ' hover:bg-gray-700 hover:text-indigo-400 rounded-lg' }
      }
    };

    const variant = variantMap[v];
    return dark ? variant.dark : variant.light;
  }

  private getSizeStyles(): string {
    const size = this.size();
    const variant = this.variant();
    const width = this.isFullWidth() ? ' w-full' : 'w-10';

    const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
      sm: ' px-3 py-1.5 text-sm gap-1.5',
      md: ' px-4 py-2.5 text-base gap-2',
      lg: ' px-6 py-3 text-lg gap-2.5'
    };

    return variant === 'icon' ? ` ${width} h-10` : ` ${sizeMap[size]}`;
  }
}