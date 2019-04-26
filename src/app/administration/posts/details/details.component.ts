import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsSandbox } from '../posts.sandbox';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  @ViewChild('comment') txtAreaAutoHeight: CdkTextareaAutosize;
  public comment:   AbstractControl;
  public commentForm:  FormGroup;

  constructor(
    private fb: FormBuilder,
    public sandBox: PostsSandbox
  ) {  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
  }

  /*
  public onClick(action: string): void {
    this.sandBox.treatment(action);
  }
  */

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initForm(): void {    
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
    this.comment     = this.commentForm.controls['comment'];
  }

  public onComment(): void {
    event.stopPropagation();
    // console.warn("onSubmit")
    this.sandBox.postComment();
  }

  onClickBack() {
    // console.log("onReset");
    this.sandBox.releaseItem();
  }

  onConfirmTreatmentDialog(action, $event) {
    // console.log($event);
    this.sandBox.treatment(action);
    // setTimeout(()=>{}, 0);
  }

}
