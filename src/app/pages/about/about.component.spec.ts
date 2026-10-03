import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the about shell without home-only content', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
    expect(page.querySelector('nav.navbar--light-bg')).not.toBeNull();
    const main = page.querySelector('main');
    expect(main?.querySelector('h1')?.textContent?.trim()).toBeTruthy();
    expect(main?.querySelectorAll('section').length).toBe(3);
    expect(main?.querySelector('#about-company')).not.toBeNull();
    expect(main?.querySelector('#about-method')).not.toBeNull();
    expect(main?.querySelector('section[aria-labelledby="about-contact"] a[href^="mailto:"]')).not.toBeNull();
    expect(page.querySelector('a[href="https://anasjournal.com"]')).toBeNull();
    expect(page.querySelector('footer[role="contentinfo"]')).not.toBeNull();
    expect(page.querySelector('section[aria-label="Hero"]')).toBeNull();
  });
});
