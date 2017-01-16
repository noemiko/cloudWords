import { Component, OnInit } from '@angular/core';
import { Authentication } from '../Authentication';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent extends Authentication implements OnInit {
    private isUserLogged:boolean;

    constructor(protected _baseService : AuthenticationService) {
        super(_baseService);

        this._baseService.userLoggedIn.subscribe(loggedIn => {
            this.isUserLogged = loggedIn;
        });
    }

    ngOnInit() {
    }
}
