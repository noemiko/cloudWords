import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers:[UserService]
})
export class ResetPasswordComponent implements OnInit {
private info = '';
private input = {mail:''};

    constructor(private _registerService : UserService) { 
    }

  ngOnInit() {
  }
    resetpass(event) {

      this._registerService.resetPassword(this.input).subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    handleResponse(response){

      if(response.error ==false){
        this.info = 'Reset link was send'
      }
 
      if(response.error ==true){
        this.info = response.message;
      }
    }
}
