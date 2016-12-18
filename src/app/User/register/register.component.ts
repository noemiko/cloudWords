import { Component, OnInit, ViewChild} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../user.service';
import { User } from './../User';
import 'rxjs/Rx';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
    private input = {login:'',password:'',password2:'',mail:''};
    private error:string;
    constructor(private _registerService : UserService) { }
    ngOnInit() { }
 
    register(event) {
     const user = new User(this.input.login, this.input.mail, this.input.password, this.input.password2)
     
      this._registerService.add(user).subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    handleResponse(response){

      if(response.error ==false){
        this.error = 'Sprawdz swoją pocztę w celu aktywacji konta'
      }
 
      if(response.type =='error'){
        this.error = response.message;
      }
    }

}
