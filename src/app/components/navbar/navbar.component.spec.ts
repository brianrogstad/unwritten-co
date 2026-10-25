import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent state', () => {
  function create(platform = 'browser'): NavbarComponent {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });
    return TestBed.runInInjectionContext(() => new NavbarComponent());
  }

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('toggles the mobile menu from closed to open and back', () => {
    const navbar = create();
    expect(navbar.mobileOpen()).toBe(false);
    navbar.toggleMobile();
    expect(navbar.mobileOpen()).toBe(true);
    navbar.toggleMobile();
    expect(navbar.mobileOpen()).toBe(false);
  });

  it.each([false, true])('closes the mobile menu when initially %s', (initial) => {
    const navbar = create();
    navbar.mobileOpen.set(initial);
    navbar.closeMobile();
    expect(navbar.mobileOpen()).toBe(false);
  });

  it('sets scrolled above 48px and clears it at and below the boundary', () => {
    const navbar = create();
    navbar.ngOnInit();
    try {
      for (const [scrollY, expected] of [[49, true], [48, false], [100, true], [0, false]] as const) {
        vi.stubGlobal('scrollY', scrollY);
        window.dispatchEvent(new Event('scroll'));
        expect(navbar.isScrolled()).toBe(expected);
      }
    } finally {
      navbar.ngOnDestroy();
    }
  });

  it('removes the browser scroll listener on destruction', () => {
    const navbar = create();
    navbar.ngOnInit();
    navbar.ngOnDestroy();
    vi.stubGlobal('scrollY', 49);
    window.dispatchEvent(new Event('scroll'));
    expect(navbar.isScrolled()).toBe(false);
  });

  it('does not register or remove a browser listener on the server', () => {
    const navbar = create('server');
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    navbar.ngOnInit();
    vi.stubGlobal('scrollY', 49);
    window.dispatchEvent(new Event('scroll'));
    expect(navbar.isScrolled()).toBe(false);
    navbar.ngOnDestroy();
    expect(add).not.toHaveBeenCalled();
    expect(remove).not.toHaveBeenCalled();
  });
});
