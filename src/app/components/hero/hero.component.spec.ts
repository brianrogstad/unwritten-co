import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HeroComponent] }).compileComponents();
  });

  it('names the company and the fact that it owns the work, without a decorative image', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const hero = fixture.nativeElement as HTMLElement;
    expect(hero.querySelector('h1')?.textContent?.trim()).toBe('Unwritten Co.');
    expect(hero.textContent).toMatch(/build and operate our own digital properties/i);
    expect(hero.querySelector('img')).toBeNull();
  });
});
