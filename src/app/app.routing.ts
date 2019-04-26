import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule }  from './auth/auth.module'


// Layouts 
import { 
  AdminLayoutComponent as CreativeTimAngularAdminLayout 
} from '@shared/layout/creativetim-theme/admin-layout/admin-layout.component';

// import { WebsiteLayoutComponent } from '@shared/layout/website/website-layout/website-layout.component';

// Website Pages
// import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes =[
  /*{
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: 'home', component: LandingPageComponent, pathMatch: 'full'},
    ]
  }, 
 /*   {
    path: 'login',
    component: LoginComponent,
    // outlet: 'sidemenu',
    pathMatch: 'full',
  }, {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },  */
  {
    path: 'admin-panel',
    pathMatch: 'prefix',
    component: CreativeTimAngularAdminLayout,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        loadChildren: './administration/administration.module#AdministrationModule'
      }
    ]
  }, 
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }, 
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'user-profile',   component: UserProfileComponent },
  // { path: 'table-list',     component: TableListComponent },
  // { path: 'typography',     component: TypographyComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: 'upgrade',        component: UpgradeComponent },
  // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

    AuthModule,

    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
