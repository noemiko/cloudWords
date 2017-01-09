import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../user.service';
import { User } from './../User';
import {Router} from '@angular/router'

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  providers:[UserService]
})
export class LogOutComponent implements OnInit {
    private input = {login:'',password:''};
    private error:string;
    constructor(private _userService : UserService, private router: Router) {

     }
    ngOnInit() { 
      this.logOut()
    }
 
    logOut() {
      this._userService.logOut().subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    handleResponse(response){
      console.log(response)
      if(response.error ==false){
        this.error = 'Zalogowano';
        sessionStorage.removeItem('user');
        this.router.navigateByUrl('');
      }
 
      if(response.error ==true){
        this.error = response.message;
      }
    }

}

