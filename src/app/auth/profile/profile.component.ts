import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common'
import { AuthSandbox } from '../auth.sandbox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  photo: any;

  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private location: Location,
    public sandBox: AuthSandbox
  ) { }

  ngOnInit() {
  }

  clearAvatarUrl() {
    this.sandBox.formStateSetValue("PROFILE_EDIT_FORM.profile.avatar","");
  }

  onFileChange($event) {
    // var image:any = new Image();
    var file:File = $event.target.files[0];
    // console.warn(file);
    var myReader:FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
        // image.src = loadEvent.target.result;
        that.photo = loadEvent.target.result;
        // console.warn(image.src);
    };
    if(file) {
      myReader.readAsDataURL(file);
    } else {
      that.photo = null;
    }
  }

  public onSubmit(event: Event): void {
    event.stopPropagation();
    this.sandBox.profileUpdate(this.photo);
  }

  public onCancel() {
    this.sandBox.resetForm();
    this.location.back();
  }

}
