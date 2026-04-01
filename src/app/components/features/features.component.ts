import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface TypewriterLine {
  text: string;
  visible: boolean;
}

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

  // --- Card 1: Type Drawer (cycling cards) ---
  readonly activeCard = signal(0);
  readonly typeDrawerCards = [
    {
      label: 'Discovery',
      title: 'What are you really building?',
      body: 'We dig past the brief to find the product truth underneath.',
    },
    {
      label: 'Strategy',
      title: 'Who needs this, and why now?',
      body: 'Audience, context, timing — the three questions that shape everything.',
    },
    {
      label: 'Research',
      title: 'What does the evidence say?',
      body: 'We let data inform and intuition confirm. In that order.',
    },
  ];
  private cycleInterval: ReturnType<typeof setInterval> | null = null;

  // --- Card 2: Press Log (typewriter) ---
  readonly typewriterLines = signal<TypewriterLine[]>([
    { text: '> initializing project...', visible: false },
    { text: '> loading design system...', visible: false },
    { text: '> compiling components...', visible: false },
    { text: '> running tests... 47 passed', visible: false },
    { text: '> building for production...', visible: false },
    { text: '> deploy complete. ✦', visible: false },
  ]);
  private typewriterActive = false;
  private typewriterTimeouts: ReturnType<typeof setTimeout>[] = [];

  // --- Card 3: Binding Schedule ---
  readonly days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  readonly activeDayIndex = signal(-1);
  private dayInterval: ReturnType<typeof setInterval> | null = null;
  private dayStep = 0;

  // --- IntersectionObserver for reveals ---
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cycleInterval = setInterval(() => {
      this.activeCard.update((i) => (i + 1) % this.typeDrawerCards.length);
    }, 3000);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Trigger typewriter when card 2 enters view
            if (
              entry.target.classList.contains('features__card--press') &&
              !this.typewriterActive
            ) {
              this.startTypewriter();
            }

            // Trigger day cycle when card 3 enters view
            if (
              entry.target.classList.contains('features__card--schedule') &&
              this.dayInterval === null
            ) {
              this.startDayCycle();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    const reveals = this.el.nativeElement.querySelectorAll('.reveal, .features__card');
    reveals.forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    if (this.cycleInterval) clearInterval(this.cycleInterval);
    if (this.dayInterval) clearInterval(this.dayInterval);
    this.typewriterTimeouts.forEach((t) => clearTimeout(t));
    this.observer?.disconnect();
  }

  private startTypewriter(): void {
    this.typewriterActive = true;
    const lines = [...this.typewriterLines()];

    lines.forEach((_, i) => {
      const t = setTimeout(() => {
        this.typewriterLines.update((prev) =>
          prev.map((line, idx) => (idx === i ? { ...line, visible: true } : line))
        );
      }, i * 520 + 400);
      this.typewriterTimeouts.push(t);
    });
  }

  private startDayCycle(): void {
    this.dayInterval = setInterval(() => {
      this.dayStep = (this.dayStep + 1) % (this.days.length + 1);
      this.activeDayIndex.set(this.dayStep === this.days.length ? -1 : this.dayStep);
      if (this.dayStep === this.days.length) {
        this.dayStep = -1;
      }
    }, 500);
  }
}
