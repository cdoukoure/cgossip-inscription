import { Component, OnInit } from '@angular/core';
import { AuthSandbox } from '@app/auth/auth.sandbox';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/admin-panel/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin-panel/users', title: 'Utilisateurs',  icon:'people', class: '' },
    // { path: '/admin-panel/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/admin-panel/posts', title: 'Publications',  icon:'content_paste', class: '' },
    { path: '/admin-panel/news', title: 'Nouvelles',  icon:'content_paste', class: '' },
    // { path: '/admin-panel/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/admin-panel/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/admin-panel/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/admin-panel/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/admin-panel/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/admin-panel/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-creativetim-sidebar',
  templateUrl: './creativetim-sidebar.component.html',
  styleUrls: ['./creativetim-sidebar.component.css']
})
export class CreativetimSidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    public sandBox: AuthSandbox,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
