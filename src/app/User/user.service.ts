import {Injectable}               from '@angular/core';
import {Http}                     from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {User}                     from './User';
import {BaseService}           from '../base/base.service';

@Injectable()
export class UserService extends BaseService {

    constructor (protected _http: Http) {
        super(_http);
    }

    private _registerUrl = this.backendPath+'register.php';
    private _logInUrl = this.backendPath+'login.php';
    private _changePassUrl = this.backendPath+'chagnePasswordWhenLogedIn.php';
    private _resetPass = this.backendPath+'verifymail.php';
    private _changePassByHashUrl = this.backendPath+'hangePassworByMail.php';
    private _logOutUrl = this.backendPath+'logout.php';

    public add(user:User): Observable<string>{
        let body = `login=${user.Login}&mail=${user.Mail}&password=${user.Password}&password2=${user.Password2}`;

        return this._http.post(this._registerUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }
    public logIn(input:any) {
        let body = `login=${input.login}&password=${input.password}`;

        return this._http.post(this._logInUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public changePasswordWhenLogged(input:any) {
        let body = `currentPassword=${input.currentPassword}&password1=${input.password1}&password2=${input.password2}`;

        return this._http.post(this._changePassUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public resetPassword(input:any) {
        let body = `mail=${input.mail}`;

        return this._http.post(this._resetPass, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public changePasswordByHash(input:any) {
        let body = `mail=${input.email}&password1=${input.password1}&password2=${input.password2}&hash=${input.hash}`;

        return this._http.post(this._changePassByHashUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }
    public logOut() {
        return this._http.post(this._logOutUrl,'',this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }


}