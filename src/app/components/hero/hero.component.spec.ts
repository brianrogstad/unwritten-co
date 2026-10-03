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

  it('should render without throwing', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
