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

  it('renders the home page shell with navigation, main sections, and footer', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
    const main = page.querySelector('main');
    expect(main).not.toBeNull();
    expect(main?.querySelector('section[aria-label="Hero"]')).not.toBeNull();
    const work = main?.querySelector('section[aria-labelledby="work-heading"]');
    expect(work).not.toBeNull();
    expect(work?.querySelectorAll('article').length).toBe(3);
    expect(main?.querySelector('section[aria-labelledby="company-note-heading"]')).not.toBeNull();
    expect(main?.querySelector('section[aria-labelledby="philosophy-heading"]')).not.toBeNull();
    expect(main?.querySelector('app-features')).toBeNull();
    expect(page.querySelector('a[href="https://anasjournal.com"]')).toBeNull();
    expect(page.querySelector('footer[role="contentinfo"]')).not.toBeNull();
  });
});
