import { Injectable }           from "@angular/core";
import {
  Http,
  Request,
  RequestMethod,
  Response
}                               from "@angular/http";
import { select, Store } from "@ngrx/store";
import { EMPTY, Observable, of } from "rxjs";
import { first, mergeMap } from "rxjs/operators";

import { HttpResponseHandler }  from './httpResponseHandler.service';
import { HttpAdapter }          from './http.adapter';
import { ConfigService }        from '@app/app-config.service';
import {
  methodBuilder,
  paramBuilder
}                               from './utils.service';
import { map, catchError } from "rxjs/operators";

import {
  AppState,
  AuthSelectors,
} from '@shared/store';


/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable()
export class HttpService {

  public constructor(
    protected http: Http,
    protected configService: ConfigService,
    protected responseHandler: HttpResponseHandler,
    protected store$: Store<AppState.State>) {}

  protected getBaseUrl(): string {
    return this.configService.get('api').baseUrl;
  }

  protected getDefaultHeaders(): Object {
    return null;
  }

  /**
  * Request Interceptor
  *
  * @method requestInterceptor
  * @param {Request} req - request object
  */
 protected requestInterceptor(req: Request) {

    const token = localStorage.getItem("jwtoken"); 
    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
      req.withCredentials = true;
    }    
    return req;
  }

  /**
  * Response Interceptor
  *
  * @method responseInterceptor
  * @param {Response} observableRes - response object
  * @returns {Response} res - transformed response object
  */
  protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    // console.log("response Interceptor:");  
    
    return observableRes.pipe(
        map(res => HttpAdapter.baseAdapter(res, adapterFn)),
        catchError((err, source) => this.responseHandler.onCatch(err, source))
    )
      // .catch((err, source) => this.responseHandler.onCatch(err, source));  
  }
}