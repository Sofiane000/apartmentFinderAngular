/**
 * Component for nav bar of the application.
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment as env } from '@env/environment';

import { Observable } from 'rxjs';
import { ThemeService } from '@app/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  /**
   * Boolean flag to check if current theme is dark.
   */
  isDarkTheme: Observable<boolean>;

  /**
   * This notifies parent component to toggle menu.
   */
  @Output() toggleMenu: EventEmitter<any> = new EventEmitter<any>();

  /**
   * This notifies parent component to toggle menu.
   */
  @Output() changeTheme: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  /**
   * Method to toggle navbar.
   */
  toggleNav() {
    this.toggleMenu.emit();
  }

  /**
   * Method to toggle current theme.
   * @param checked bool value.
   */
  toggleDarkTheme(checked: boolean) {
    this.changeTheme.emit(checked);
  }
}
