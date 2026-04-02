import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  readonly nightlyJobs = [
    { name: 'code-review', active: true },
    { name: 'security-review', active: true },
    { name: 'backlog-route', active: true },
    { name: 'ana-journal', active: true },
    { name: 'ana-images', active: true },
    { name: 'memory-maintenance', active: true },
    { name: 'dependabot-triage', active: true },
    { name: 'project-continuity', active: true },
    { name: 'task-mining', active: false },
    { name: 'doc-hygiene', active: true },
    { name: 'daily-briefing', active: true },
    { name: 'world-state', active: true },
  ];

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
