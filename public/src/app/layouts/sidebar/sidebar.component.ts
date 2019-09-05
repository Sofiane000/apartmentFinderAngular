/**
 * Component for sidebar.
 */
import { Component, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /**
   * Menu items for the sidebar.
   */
  menuItems: IMenuItem[] = [
    {
      MenuName: 'Apartments',
      MenuURI: '/home/apartments',
      MenuIcon: 'dashboard'
    },
    {
      MenuName: 'Test',
      MenuURI: '',
      MenuIcon: 'person'
    }
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
