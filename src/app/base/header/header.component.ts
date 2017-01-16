import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Authentication } from '../Authentication';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'navigation-bar',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends Authentication {
    private loggedIn: any;
    constructor(private _baseService : AuthenticationService, private _ref: ChangeDetectorRef) {
        super(_baseService);
        this.isLogged();

        const isLogged = this._baseService.userLoggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });


    }


}

