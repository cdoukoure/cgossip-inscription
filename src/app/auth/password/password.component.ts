import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { AuthSandbox } from '../auth.sandbox';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  constructor(
    public sandBox: AuthSandbox,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  onConfirmUpdatePasswordDialog($event: any) {
    // console.log($event);
    this.sandBox.passwordUpdate();
    // this._location.back();
  }

  backClicked() {
    this.sandBox.resetForm();
    this._location.back();
  }
}


