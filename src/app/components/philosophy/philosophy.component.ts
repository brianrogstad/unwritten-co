import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-philosophy',
  standalone: true,
  templateUrl: './philosophy.component.html',
  styleUrl: './philosophy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhilosophyComponent {}
