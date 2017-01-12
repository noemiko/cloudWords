import {Injectable}               from '@angular/core';
import {Http, Response}           from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs/Observable';

@Injectable()
export class DefaultService {
    protected headers:Headers;
    protected options:RequestOptions;
    protected backendPath:string = './../backend/';

    constructor (protected _http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    protected handleError (error: Response) {
        console.error('Error in retrieving news: ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }


}