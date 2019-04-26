import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsSandbox } from '../news.sandbox';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    public sandBox: NewsSandbox
  ) {  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  /*
  public onClick(action: string): void {
    this.sandBox.treatment(action);
  }
  */

  onClickBack() {
    // console.log("onReset");
    this.sandBox.releaseItem();
  }

  onConfirmTreatmentDialog() {
    this.sandBox.treatment('validation');
  }

  onConfirmDeleteDialog() {
    this.sandBox.deleteItem()
  }

  showEditForm () {
    this.sandBox.getItem(this.sandBox.Id, 'edition');
  }




}
