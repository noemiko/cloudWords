import {Injectable}               from '@angular/core';
import {Http, Response}           from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {User}                     from './User';
 
@Injectable()
export class UserService {
  constructor (private _http: Http) {}
 
 private _registerUrl = 'http://localhost/cloudWords/backend/register.php';
 private _logInUrl = 'http://localhost/cloudWords/backend/login.php';

  add(user:User): Observable<string>{
    let body = `login=${user.Login}&mail=${user.Mail}&password=${user.Password}&password2=${user.Password2}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(this._registerUrl, body, options)
                    .map(res =>  <string> res.json())
                    .catch(this.handleError)
  }
   logIn(input:any) {
    let body = `login=${input.login}&password=${input.password}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
        return this._http.post(this._logInUrl, body, options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }
 
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('Error in retrieving news: ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }
}