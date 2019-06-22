import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  @Input() default?: any; //
  @Input() defaultType?: any; //
  @Input() ressource: any; //
  @Input() ressourceType: any = 'image'; //
  @Input() canVideo: boolean = true; //
  @Output() onChange: EventEmitter<any> = new EventEmitter(); // ...and emit actions that should

  mediaName: File = null;
  mediaType: string;

  videoFile: File = null;
  videoUrl: any;
  videoUrlToggled: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // this.getType()
  }

  public toggleVideoUrl() {
    this.videoUrlToggled = !this.videoUrlToggled;
  }

  public setVideoUrl() {
    if (!this.canVideo) return;
    // console.log(this.videoUrl)
    this.onChange.emit({ ressource: this.videoUrl, ressourceType: 'video' });
    this.videoUrlToggled = false;
  }

  public clearMedia() {
    this.onChange.emit({ ressource: null, ressourceType: '' })
    // this.mediaType = '';
  }

  public onFileChange($event, isVideo:boolean = false) {
    // console.log($event);
    this.mediaName = $event.target.files[0];
    this.getType();
    
    if (isVideo && this.mediaType === 'video') {
      // console.log(isVideo);
      this.onChange.emit({ ressource: this.mediaName, ressourceType: this.mediaType })
    } else {
      var myReader: FileReader = new FileReader();
      let that = this;
      myReader.onloadend = function (loadEvent: any) {
        // that.getType();
        // console.log(that.mediaType)
        if (that.mediaType === 'image') 
          that.onChange.emit({ ressource: loadEvent.target.result, ressourceType: that.mediaType })
      };
      myReader.readAsDataURL(this.mediaName);
    }

  }

  private getExtension() {
    let parts;
    if (this.mediaName) {
      // return this.mediaName.type;
      parts = this.mediaName.type.split('/');
      // console.log(parts);
      // console.log(parts[parts.length - 1])
      return parts[parts.length - 1];
    }
    parts = this.ressource.split('.');
    return parts[parts.length - 1];
  }

  private getType() {
    var ext = this.getExtension();
    // console.log(ext);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
        // etc
        this.mediaType = 'image';
        break;
      case 'm4v':
      case 'avi':
      case 'mpeg':
      case 'mpg':
      case 'mp4':
        // etc
        this.mediaType = 'video';
        break;
      default:
        this.mediaType = ''
    }
  }

}
