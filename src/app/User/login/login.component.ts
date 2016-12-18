import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../user.service';
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
    constructor(private _registerService : UserService, private router: Router) { }
    ngOnInit() { }
 
    logIn(event) {
     //const user = new User(this.input.login, this.input.mail, this.input.password)
     
      this._registerService.logIn(this.input).subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    handleResponse(response){
      console.log(response)
      if(response.error ==false){
        this.error = 'Zalogowano';
        sessionStorage.setItem('user', this.input.login);
        this.router.navigateByUrl('gallery');
      }
 
      if(response.error ==true){
        this.error = response.message;
      }
    }

}
