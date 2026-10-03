import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('acts as a company sign, with real work and a direct way to write', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const main = page.querySelector('main');
    expect(main?.querySelector('h1')?.textContent?.trim()).toBe('Unwritten Co.');
    expect(main?.textContent).toMatch(/build and operate our own digital properties/i);
    expect(main?.querySelector('a[href="https://theleagueindex.com/"]')).not.toBeNull();
    expect(main?.querySelector('a[href="mailto:support@theunwrittencompany.com"]')).not.toBeNull();
    expect(page.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
    expect(page.querySelector('a[href="/about"]')).toBeNull();
    expect(main?.querySelector('img')).toBeNull();
    expect(main?.querySelector('app-philosophy')).toBeNull();
    expect(main?.querySelector('app-features')).toBeNull();
    expect(page.querySelector('a[href="https://anasjournal.com"]')).toBeNull();
    expect(page.querySelector('footer[role="contentinfo"]')).not.toBeNull();
  });
});
