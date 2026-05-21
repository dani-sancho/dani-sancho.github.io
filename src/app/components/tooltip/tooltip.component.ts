import { AfterViewInit, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent implements AfterViewInit {
  text = input.required<string>();
  show = input<boolean>(false);
  animated = input<boolean>(false);
  hasBeenInit = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.hasBeenInit.set(true);
  }
}
