import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

// jsdom has no IntersectionObserver; the features and philosophy sections use it for reveals.
class NoopIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): [] {
    return [];
  }
}

describe('app routes', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeAll(() => {
    if (!('IntersectionObserver' in globalThis)) {
      (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
        NoopIntersectionObserver;
    }
  });

  beforeEach(async () => {
    vi.spyOn(console, 'error');
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    const errors = vi.mocked(console.error).mock.calls;
    vi.restoreAllMocks();
    expect(errors).toEqual([]);
  });

  function page(): HTMLElement {
    return harness.routeNativeElement as HTMLElement;
  }

  function expectHomeSections(el: HTMLElement): void {
    const hero = el.querySelector('section[aria-label="Hero"]');
    expect(hero).not.toBeNull();
    expect(el.querySelector('[data-testid="hero-headline"]')?.textContent?.trim()).toBeTruthy();

    const features = el.querySelector('section[aria-labelledby="features-heading"]');
    expect(features).not.toBeNull();
    expect(features?.querySelectorAll('article').length).toBe(3);

    const philosophy = el.querySelector('section[aria-labelledby="philosophy-heading"]');
    expect(philosophy).not.toBeNull();
    expect(el.querySelector('[data-testid="philosophy-statement"]')?.textContent?.trim()).toBeTruthy();

    const footer = el.querySelector('footer[role="contentinfo"]');
    expect(footer).not.toBeNull();
    expect(el.querySelector('[data-testid="footer-copy"]')?.textContent?.trim()).toBeTruthy();
  }

  it('/ renders the home page sections', async () => {
    await harness.navigateByUrl('/');
    expect(router.url).toBe('/');
    expectHomeSections(page());
  });

  it('/about renders the company-identity content', async () => {
    await harness.navigateByUrl('/about');
    expect(router.url).toBe('/about');
    const el = page();
    expect(el.querySelector('main.about h1')?.textContent?.trim()).toBeTruthy();
    expect(el.querySelectorAll('main.about section').length).toBeGreaterThan(0);
    expect(el.querySelector('footer[role="contentinfo"]')).not.toBeNull();
    expect(el.querySelector('section[aria-label="Hero"]')).toBeNull();
  });

  it('an unknown path redirects to / and renders home', async () => {
    await harness.navigateByUrl('/no-such-page/deeper');
    expect(router.url).toBe('/');
    expectHomeSections(page());
  });

  it('leaves about and renders home when navigating to an unknown path', async () => {
    await harness.navigateByUrl('/about');
    expect(router.url).toBe('/about');
    expect(page().querySelector('main.about')).not.toBeNull();

    await harness.navigateByUrl('/missing-after-about');
    expect(router.url).toBe('/');
    expect(page().querySelector('section[aria-label="Hero"]')).not.toBeNull();
    expect(page().querySelector('main.about')).toBeNull();
  });
});
