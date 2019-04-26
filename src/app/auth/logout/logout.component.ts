import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthSandbox } from '../auth.sandbox';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private sandBox: AuthSandbox,
    private _location: Location
  ) { }

  ngOnInit() {
    this.sandBox.logout();   
    // this._location.back();
  }

}
