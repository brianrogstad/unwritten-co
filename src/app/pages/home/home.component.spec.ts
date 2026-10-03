import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

// The page renders the real feature and philosophy components, which register reveal observers.
class NoopIntersectionObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('HomeComponent', () => {
  beforeEach(async () => {
    vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver);
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('renders the home page shell with navigation, main sections, and footer', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
    const main = page.querySelector('main');
    expect(main).not.toBeNull();
    expect(main?.querySelector('section[aria-label="Hero"]')).not.toBeNull();
    expect(main?.querySelector('section[aria-labelledby="features-heading"]')).not.toBeNull();
    expect(main?.querySelector('section[aria-labelledby="philosophy-heading"]')).not.toBeNull();
    expect(page.querySelector('footer[role="contentinfo"]')).not.toBeNull();
  });
});
