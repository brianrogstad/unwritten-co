import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Trigger entrance animation on next frame
    requestAnimationFrame(() => {
      const reveals = this.el.nativeElement.querySelectorAll('.reveal');
      reveals.forEach((el: Element, i: number) => {
        setTimeout(() => el.classList.add('is-visible'), i * 120 + 300);
      });
    });
  }

  scrollToWork(): void {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  }
}
