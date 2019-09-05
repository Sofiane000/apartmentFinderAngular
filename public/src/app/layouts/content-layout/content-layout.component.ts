/**
 * Component which presents the structure of the application.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '@app/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  private overlayContainer: OverlayContainer;
  theme = 'my-light-theme';
  isDarkTheme: Observable<boolean>;
  isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isTablet: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @ViewChild('menu', { static: false }) menu: any;

  constructor(
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

    if (this.overlayContainer) {
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    }
  }

  /**
   * Method to toggle theme
   * @param theme Boolean flag to show dark theme or not.
   */
  onThemeChange(theme: boolean) {
    this.themeService.setDarkTheme(theme);
    this.theme = theme ? 'my-dark-theme' : 'my-light-theme';

    if (this.overlayContainer) {
      const overlayContainerClasses = this.overlayContainer.getContainerElement()
        .classList;
      const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
        (item: string) => item.includes('-theme')
      );
      if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
      }
      overlayContainerClasses.add(this.theme);
    }
  }

  /**
   * Method to toggle menu.
   */
  toggleMenu() {
    this.menu.toggle();
  }
}
