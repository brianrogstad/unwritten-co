import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    const reveals = this.el.nativeElement.querySelectorAll('.reveal');
    reveals.forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
