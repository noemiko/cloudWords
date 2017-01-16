import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './../User';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-activation-user',
    templateUrl: 'activation-user.component.html',
    styleUrls: ['activation-user.component.css'],
    providers:[UserService]
})
export class ActivationUserComponent implements OnInit {

    private info:string;

    constructor(private _activateService : UserService, private _router:ActivatedRoute) {

        const mail =_router.snapshot.params['email'];
        const hash =_router.snapshot.params['hash'];
        this.activate(mail, hash);

    }

    ngOnInit() {
    }
    activate(mail:string, hash:string) {
        const user:User = new User();
        user.mail = mail;
        user.hash = hash;

        this._activateService.activate(user).subscribe(

            response => this.handleResponse(response),
            error => this.handleResponse(error)
        );
    }

    handleResponse(response){
        console.log(response)
        if(response.error ==false){
            this.info = response.message;
        }

        if(response.error ==true){
            this.info = response.message;
        }
    }
}
