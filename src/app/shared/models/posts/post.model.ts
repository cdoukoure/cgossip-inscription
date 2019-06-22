// import * as moment from 'moment';
import moment from 'moment';
import { Comment } from './comment.model';
// const moment = moment_;
// import moment = require('moment');
// import { AsyncItem } from "@app/shared/utility";

export type Media = {
  url: any,
  type: string,
}

export type Stats = {
  likes: any,
  comments: any,
}

export type Author = {
  id: any,
  avatar: any,
  firstname: string,
  lastname: string
}

export interface IPost {
  id: any;
  author: any;
  media: Media,
  mediaOri: Media,
  title: string;
  content: string;
  description: string;
  stats: Stats,
  lastmodified: any;
  state: string;
  delay: any;
  comments: Comment[]
}

export class Post implements IPost {
  public id: any;
  public author: any;
  public media: Media;
  public mediaOri: Media;
  public title: string;
  public description: string;
  public content: string;
  public stats: Stats;
  public lastmodified: string;
  public state: 'draft' | 'submitted' | 'waiting' | 'validated' | 'refused' | 'deleted';
  public delay: any;
  public comments: Comment[];

  // private mediaReader: FileReader = new FileReader();

  constructor(post?: any) {
    /* let that = this;
    this.mediaReader.onloadend = function (loadEvent: any) {
      that.media = {url: loadEvent.target.result, type:'image'}
    }; */

    /*
    this.media = {url: '', type:'image'};

    if (post && post.media.type == 'image' && post.media.url !== '' ) {
      console.log("Media must be {url: 'base64', type:'image'}")
      this.getMediaFromUrl(post.media.url, function(base64Img) {
        console.log(base64Img);
        this.media = {url: base64Img, type:'image'}
      })
      console.log("Media is {url: 'base64', type:'image'}")
    } else if (post && post.media.type == 'video' ) {
      console.log("Media must be {url: 'url of medial', type:'video'}")
      this.media = post.media;
    } 
    else {
      console.log("Media must be {url: '', type:'image'}")
      this.media = {url: '', type:'image'};
    }
    */

    this.id = post ? post.id : null;
    this.author = post ? post.author : null;
    // this.media = post ? { url: '', type: post.media.type } : { url: '', type: 'image' };
    this.media = post ? post.media : { url: '', type: '' };
    this.mediaOri = post ? post.media : { url: '', type: '' };
    this.title = post ? post.title : '';
    this.description = post ? post.description : '';
    this.content = post ? post.content : '';
    this.stats = post ? post.stats : { likes: 0, comments: 0 };
    this.lastmodified = post ? post.lastmodified : '';
    this.state = post ? post.state : 'draft';
    //let myMoment: moment.Moment = moment(post.delay).format("DD-MM-YYYY HH:mm:00");
    this.delay = post ? moment(post.delay).format("DD-MM-YYYY HH:mm:00") : '';
    this.comments = post ? post.comments : [];
  }

  /* function convertFileToDataURLviaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  } */

  /* private getMediaFromUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      const token = localStorage.getItem("jwtoken"); 
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.withCredentials = true;
      }
      xhr.responseType = 'blob';
      xhr.send();
  }  */

}

// export type AsyncPostList = AsyncItem<Post>[];
