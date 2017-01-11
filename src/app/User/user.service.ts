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
 private _changePassUrl = 'http://localhost/cloudWords/backend/chagnePasswordWhenLogedIn.php';
 private _resetPass = 'http://localhost/cloudWords/backend/verifymail.php';
 private _changePassByHashUrl = 'http://localhost/cloudWords/backend/changePassworByMail.php';
 private _logOutUrl = 'http://localhost/cloudWords/backend/logout.php';

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

    changePasswordWhenLogged(input:any) {
    let body = `currentPassword=${input.currentPassword}&password1=${input.password1}&password2=${input.password2}`;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
        return this._http.post(this._changePassUrl, body, options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    resetPassword(input:any) {
    let body = `mail=${input.mail}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
        return this._http.post(this._resetPass, body, options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    changePasswordByHash(input:any) {
    let body = `mail=${input.email}&password1=${input.password1}&password2=${input.password2}&hash=${input.hash}`;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
        return this._http.post(this._changePassByHashUrl, body, options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }
    logOut() {
      let input = 'hhh';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = `mail=${input}`;
    let options = new RequestOptions({ headers: headers });
        return this._http.post(this._logOutUrl,body,options)
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