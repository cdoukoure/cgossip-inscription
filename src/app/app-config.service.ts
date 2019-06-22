import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, map, tap } from 'rxjs/operators';
import {
  Http,
  Headers,
  RequestOptions
}                     from '@angular/http';

import environment from '../config/env.json';
import development from '../config/development.json';
import production from '../config/production.json';
import test from '../config/test.json';


@Injectable({
  providedIn: "root"
})
export class ConfigService {

  private config: Object 
  public env: Object

  constructor(private http: Http) {}

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise((resolve, reject) => {
      try {
        this.env = environment.env;
        this.config = this.env === "development" ? development : production
        resolve(true);
      }
      catch(error) {
        return Observable.throw(error.json().error || 'Server error');
      };
    });
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key
   */
  get(key: any) {
    return this.config[key];
  }
}