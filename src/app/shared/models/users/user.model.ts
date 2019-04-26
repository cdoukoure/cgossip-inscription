import { Boxed, box } from "ngrx-forms";

export interface IGroup {
  id?: number;
  name: string;
  desc: any
}

export class Group implements IGroup {
  public id?: number;
  public name: string;
  public desc;

  constructor(group?: any) {
    this.id = group ? group.id : null;
    this.name  = group ? group.name : '';
    this.desc = null;
  }

}

export interface IConfigUser {
  minPseudo: number;
  maxPseudo: number;
  minLastname: number;
  maxLastname: number;
  minFirstname: number;
  maxFirstname: number;
}

export class ConfigUser implements IConfigUser {
  minPseudo: number = 3;
  maxPseudo: number = 20;
  minLastname: number = 3;
  maxLastname: number = 20;
  minFirstname: number = 3;
  maxFirstname: number = 20;
}

export interface IUser {
  avatar: any;
  pseudo: string;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  groups: Boxed<number[]>;
  metadata: any;
}

export class User implements IUser {
  public avatar:      any;
  public pseudo:      string;
  public firstname:   string;
  public lastname:    string;
  public phone:       string;
  public country:     string | null;
  public groups:      Boxed<number[]>;
  public metadata:      any;

  constructor(user?: any) {
    this.avatar    = user ? user.avatar : '';
    this.pseudo    = user ? user.pseudo : '';
    this.firstname = user ? user.firstname : '';
    this.lastname  = user ? user.lastname : '';
    this.phone     = user ? user.phone : '';
    // this.country   = user ? user.country.toLowerCase() : 'ci';
    let meta;
    meta = user && user.metadata ? user.metadata : '{"pays":"ci"}'
    meta = JSON.parse(meta);
    this.country   = user && user.metadata ? meta.pays.toLowerCase() : 'ci';

    this.groups    = user ? box(user.groups) : box([4]);
  }

}

export interface UserForm {
  user: User;
  config: ConfigUser;
}
