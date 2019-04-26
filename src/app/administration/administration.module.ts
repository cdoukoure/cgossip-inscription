import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutes } from './administration.routing';

import { DashboardComponent } from '@app/administration/dashboard/dashboard.component';
import { UserProfileComponent } from '@app/administration/user-profile/user-profile.component';
import { TableListComponent } from '@app/administration/table-list/table-list.component';
import { TypographyComponent } from '@shared/typography/typography.component';
import { IconsComponent } from '@shared/icons/icons.component';
import { MapsComponent } from '@shared/maps/maps.component';
import { NotificationsComponent } from '@shared/notifications/notifications.component';
import { UpgradeComponent } from '@app/administration/upgrade/upgrade.component';



import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatPaginatorModule,
  MatSortModule,
  // MatTableModule,
  // MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdministrationRoutes),
    FormsModule,

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdministrationModule {}
