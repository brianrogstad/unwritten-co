import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  afterEach(() => vi.restoreAllMocks());

  it('toggles the mobile menu open and closed', () => {
    const navbar = TestBed.createComponent(NavbarComponent).componentInstance;

    expect(navbar.mobileOpen()).toBe(false);
    navbar.toggleMobile();
    expect(navbar.mobileOpen()).toBe(true);
    navbar.toggleMobile();
    expect(navbar.mobileOpen()).toBe(false);
  });

  it('closes an open mobile menu and leaves a closed menu closed', () => {
    const navbar = TestBed.createComponent(NavbarComponent).componentInstance;

    navbar.toggleMobile();
    expect(navbar.mobileOpen()).toBe(true);
    navbar.closeMobile();
    expect(navbar.mobileOpen()).toBe(false);
    navbar.closeMobile();
    expect(navbar.mobileOpen()).toBe(false);
  });

  it('sets scrolled state only above 48px in the browser', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const scrollY = vi.spyOn(window, 'scrollY', 'get');
    fixture.detectChanges();

    expect(fixture.componentInstance.isScrolled()).toBe(false);
    scrollY.mockReturnValue(49);
    window.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.isScrolled()).toBe(true);

    scrollY.mockReturnValue(48);
    window.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.isScrolled()).toBe(false);

    scrollY.mockReturnValue(49);
    window.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.isScrolled()).toBe(true);

    scrollY.mockReturnValue(0);
    window.dispatchEvent(new Event('scroll'));
    expect(fixture.componentInstance.isScrolled()).toBe(false);
    fixture.destroy();
  });

  it('does not register a scroll handler on the server', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();

    expect(addEventListener).not.toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything());
    expect(fixture.componentInstance.isScrolled()).toBe(false);
    fixture.destroy();
  });
});
