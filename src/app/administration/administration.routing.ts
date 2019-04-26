import { Routes } from '@angular/router';

import { DashboardComponent } from '@app/administration/dashboard/dashboard.component';
import { UserProfileComponent } from '@app/administration/user-profile/user-profile.component';
import { TableListComponent } from '@app/administration/table-list/table-list.component';
import { TypographyComponent } from '@shared/typography/typography.component';
import { IconsComponent } from '@shared/icons/icons.component';
import { MapsComponent } from '@shared/maps/maps.component';
import { NotificationsComponent } from '@shared/notifications/notifications.component';
import { UpgradeComponent } from '@app/administration/upgrade/upgrade.component';

// import { UsersModule } from '@app/administration/users/users.module';


export const AdministrationRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    {
      path: 'news',
      pathMatch: 'prefix',
      children: [
          {
            path: '',
            loadChildren: '@app/administration/news/news.module#NewsModule'
          }
        ]
    },
    {
      path: 'posts',
      pathMatch: 'prefix',
      children: [
          {
            path: '',
            loadChildren: '@app/administration/posts/posts.module#PostsModule'
          }
        ]
    },
    {
      path: 'users',
      pathMatch: 'prefix',
      data: {preload: true},
      children: [
          {
            path: '',
            loadChildren: '@app/administration/users/users.module#UsersModule'
          }
        ]
    },
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full'
    }, 
    {
      path: '**',
      redirectTo: 'users',
      pathMatch: 'full'
    }
  ];
