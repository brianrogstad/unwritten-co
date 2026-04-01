import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  /** When true, navbar uses light-bg styling from the start (no dark hero behind it) */
  @Input() lightBg = false;

  readonly isScrolled = signal(false);
  readonly showSolid = computed(() => this.lightBg || this.isScrolled());

  private scrollHandler = (): void => {
    this.isScrolled.set(window.scrollY > 48);
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
