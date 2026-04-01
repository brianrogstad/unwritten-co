import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly navLinks: { label: string; id: string }[] = [
    { label: 'Work', id: 'work' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'commission' },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
