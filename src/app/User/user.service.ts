import {Injectable}               from '@angular/core';
import {Http}                     from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {User}                     from './User';
import {AuthenticationService}           from '../base/authentication.service';

@Injectable()
export class UserService extends AuthenticationService {

    constructor (protected _http: Http) {
        super(_http);
    }

    private _registerUrl = this.backendPath+'register.php';
    private _logInUrl = this.backendPath+'login.php';
    private _changePassUrl = this.backendPath+'chagnePasswordWhenLogedIn.php';
    private _resetPass = this.backendPath+'verifymail.php';
    private _changePassByHashUrl = this.backendPath+'changePassworByMail.php';
    private _logOutUrl = this.backendPath+'logout.php';
    private _activationUrl = this.backendPath+'accountActivated.php';

    public activate(user:User): Observable<string>{
        let body = `mail=${user.mail}&hash=${user.hash}`;

        return this._http.post(this._activationUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public add(user:User): Observable<string>{
        let body = `login=${user.login}&mail=${user.mail}&password=${user.password}&password2=${user.password2}`;

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
        let gfg = 'kk'
        let body = `mail=${gfg}`;
        return this._http.post(this._logOutUrl,body,this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }


}