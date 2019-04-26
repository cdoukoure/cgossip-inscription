// import moment = require('moment');
import moment from 'moment';

export interface IComment {
  id:           any;
  pubid:        any;
  author:       any;
  authavatar:   any;
  pseudo:    string;
  text:      string;
  date:         any;
  parent:       any;
  comments:      [];
}

export class Comment implements IComment {
  public id:          any;
  public pubid:       any;
  public author:      any;
  public authavatar:  any;
  public pseudo:   string;
  public text:     string;
  public date:        any;
  public parent:      any;
  public comments:     [];

  constructor(comment?: any) {
    this.id         = comment ? comment.id : null;
    this.pubid      = comment ? comment.pubid : null;
    this.author     = comment ? comment.author : null;
    this.authavatar = comment ? comment.authavatar : null;
    this.pseudo     = comment ? comment.pseudo : '';
    this.text       = comment ? comment.text : '';
    this.date       = comment ? moment(comment.date).format("DD-MM-YYYY HH:mm:00") : '';
    this.parent     = comment ? comment.parent : null;
    this.comments  = comment ? comment.comments : [];
  }
}

