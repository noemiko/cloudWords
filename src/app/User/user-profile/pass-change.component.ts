import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pass-change',
  templateUrl: 'pass-change.component.html',
  styleUrls: ['pass-change.component.css'],
  providers:[UserService]
})
export class PassChangeComponent implements OnInit {
  private information:string = '';
  private routeMail:string;
  private hash:string;
  private input ={currentPassword:'',password1:'', password2:''};
  private inputWithHash ={password1:'', password2:''};
  private isResetByEmailLink:boolean = false;
  private isResetWhenUserIsLogged:boolean = false;

      constructor(private _registerService : UserService,private _router:ActivatedRoute) { 
      this.routeMail =_router.snapshot.params['email'];
      this.hash =_router.snapshot.params['hash'];

    }
  ngOnInit() {
      if(this.routeMail==undefined&&this.hash==undefined){
          this.isResetWhenUserIsLogged = true;
      }else{
          this.isResetByEmailLink = true;
      }
  }
  changePassword(){
          if(this.isResetWhenUserIsLogged == true){
              this.changePasswordWhenLogged();
          }else{
              this.changePasswordByHash();
          }

  }
    changePasswordWhenLogged() {
      this._registerService.changePasswordWhenLogged(this.input).subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }

    changePasswordByHash() {
      this.input['hash'] = this.hash;
      this.input['email'] = this.routeMail;
      this._registerService.changePasswordByHash(this.input ).subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    handleResponse(response){
    console.log(response)
      if(response.error ==false){
        this.information = 'Password is changed'
      }
 
      if(response.error ===true){
        this.information = response.message;
      }
    }

}
