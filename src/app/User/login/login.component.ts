import { Component, OnInit, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../user.service';
import { AuthenticationService } from './../../base/authentication.service';
import { User } from './../User';
import {Router} from '@angular/router'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers:[UserService]
})
export class LoginComponent implements OnInit {
    private input = {login:'',password:''};
    private error:string;
    constructor(private _registerService : UserService, private router:Router, private auth: AuthenticationService) {

    }
    ngOnInit() { }

    logIn(event) {
        this._registerService.logIn(this.input).subscribe(

            response => this.handleResponse(response),
            error => this.handleResponse(error)
        );
    }

    handleResponse(response){
        if(response.error ===false){
            sessionStorage.setItem('user', response.message.id);
            this.auth.userLoggedIn.next(true);
            this.router.navigateByUrl('gallery');
        }

        if(response.error ===true){
            this.error = response.message;
        }
    }

}
