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
  public state: 'draft' | 'submitted' | 'waiting' | 'validated' | 'refused' | 'deleted' ;
  public delay: any;
  public comments: Comment[];

  constructor(post?: any) {
    this.id           = post ? post.id : null;
    this.author       = post ? post.author : null;
    this.media        = post ? {url: '', type:post.media.type}: {url: '', type:'image'};
    this.mediaOri     = post ? post.media : {url: '', type:'image'};
    this.title        = post ? post.title : '';
    this.description  = post ? post.description : '';
    this.content      = post ? post.content : '';
    this.stats        = post ? post.stats : {likes: 0, comments: 0};
    this.lastmodified = post ? post.lastmodified : '';
    this.state        = post ? post.state : 'draft'; 
    //let myMoment: moment.Moment = moment(post.delay).format("DD-MM-YYYY HH:mm:00");
    this.delay        = post ? moment(post.delay).format("DD-MM-YYYY HH:mm:00") : '';
    this.comments     = post ? post.comments : []; 
  }
}

// export type AsyncPostList = AsyncItem<Post>[];
