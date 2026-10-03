import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('hides the broken decorative photo when the remote image fails', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector('.hero__image') as HTMLImageElement;

    expect(image.hidden).toBe(false);
    image.dispatchEvent(new Event('error'));
    expect(image.hidden).toBe(true);
    // The global img { display: block } rule overrides the browser's [hidden] default.
    const hiddenRule = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .map((rule) => rule.cssText)
      .find((rule) => rule.includes('.hero__image[hidden]'));
    expect(hiddenRule).toContain('display: none');
    expect(fixture.nativeElement.querySelector('[data-testid="hero-headline"]').textContent.trim())
      .toBeTruthy();
  });

  it('keeps an ink-and-brass backdrop underneath the remote image', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const backgroundRules = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .map((rule) => rule.cssText)
      .filter((rule) => rule.includes('.hero__bg'))
      .join(' ');

    expect(backgroundRules).toContain('radial-gradient');
    expect(backgroundRules).toContain('var(--color-brass)');
    expect(backgroundRules).toContain('var(--color-ink)');
  });

  it('should render without throwing', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
