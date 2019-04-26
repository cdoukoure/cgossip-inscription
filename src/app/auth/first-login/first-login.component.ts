import { Component, OnInit } from '@angular/core';
import { AuthSandbox } from '../auth.sandbox';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  constructor(
    public sandBox: AuthSandbox,
  ) { }

  ngOnInit() {
  }

  onContinue() {
    // console.log($event);
    this.sandBox.firstlogin();
    // this._location.back();
  }
}


