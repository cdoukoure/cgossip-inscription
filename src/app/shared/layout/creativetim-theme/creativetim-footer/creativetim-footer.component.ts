import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creativetim-footer',
  templateUrl: './creativetim-footer.component.html',
  styleUrls: ['./creativetim-footer.component.css']
})
export class CreativetimFooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
