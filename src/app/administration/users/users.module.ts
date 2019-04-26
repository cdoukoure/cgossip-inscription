import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Store
import { MaterialModule } from '../../material/material.module';
import { NgrxFormsModule } from 'ngrx-forms';


import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


import {
  // Module
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatPaginatorModule,
  MatSortModule,
  //MatTableModule,
  //MatIconModule
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatProgressBarModule,

  // Components
  // MatDialogContent,
  // MatDialogActions,
} from '@angular/material';

// import { FormControlStateDirective } from '@shared/store/form-management/form-control-state.directive'
import { MatIntlTelInput } from '@shared/components/mat-intl-tel-input/mat-intl-tel-input.component';
import { MatCountrySelectComponent } from "@shared/components/mat-country-select/mat-country-select.component"

import { UsersApiClient } from './usersApiClient.service';

import { UsersRoutingModule } from './users-routing.module';

import { TableListComponent } from './table-list/table-list.component';
import { EditFormComponent } from './edit-form/edit-form.component';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
 
    MaterialModule, // for ngrx-forms
    NgrxFormsModule,

    // Angular Material

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    
    SweetAlert2Module,

    UsersRoutingModule,

    // StateModule
    // MatCountrySelectComponent,
  ],
  providers: [
    UsersApiClient,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  declarations: [
    TableListComponent, 
    EditFormComponent, 
    MatCountrySelectComponent,
    MatIntlTelInput,
  ],
})
export class UsersModule { }
