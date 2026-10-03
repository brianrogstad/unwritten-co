import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('provides a home link and direct correspondence without a second page menu', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();

    const nav = fixture.nativeElement as HTMLElement;
    expect(nav.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
    expect(nav.querySelector<HTMLAnchorElement>('[data-testid="navbar-logo"]')?.getAttribute('href')).toBe('/');
    expect(nav.querySelector<HTMLAnchorElement>('[data-testid="nav-cta"]')?.getAttribute('href'))
      .toBe('mailto:support@theunwrittencompany.com');
    expect(nav.querySelectorAll('a')).toHaveLength(2);
    expect(nav.querySelector('button')).toBeNull();
  });
});
