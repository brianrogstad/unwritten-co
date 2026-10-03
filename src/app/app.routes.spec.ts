import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('app routes', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    vi.spyOn(console, 'error');
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    const errors = vi.mocked(console.error).mock.calls;
    vi.restoreAllMocks();
    expect(errors).toEqual([]);
  });

  function expectSign(): void {
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelector('main h1')?.textContent?.trim()).toBe('Unwritten Co.');
    expect(el.querySelector('section[aria-labelledby="work-heading"]')).not.toBeNull();
    expect(el.querySelector('section[aria-labelledby="example-heading"] a[href="https://theleagueindex.com/"]')).not.toBeNull();
    expect(el.querySelector('section[aria-labelledby="correspondence-heading"] a[href^="mailto:"]')).not.toBeNull();
    expect(el.querySelector('a[href="/about"]')).toBeNull();
    expect(el.querySelector('footer[role="contentinfo"]')).not.toBeNull();
  }

  it('/ renders the company sign', async () => {
    await harness.navigateByUrl('/');
    expect(router.url).toBe('/');
    expectSign();
  });

  it('/about returns visitors with old links to the sign', async () => {
    await harness.navigateByUrl('/about');
    expect(router.url).toBe('/');
    expectSign();
  });

  it('an unknown path returns to the sign', async () => {
    await harness.navigateByUrl('/no-such-page/deeper');
    expect(router.url).toBe('/');
    expectSign();
  });
});
