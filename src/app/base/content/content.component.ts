import { Component, OnInit } from '@angular/core';
import { Authentication } from '../Authentication';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent extends Authentication implements OnInit {
    private header:string;
    private undertext:string;

    constructor(protected _defaultService : AuthenticationService) {
        super(_defaultService);
        this.isLogged();
    }

    ngOnInit() {
    }

    private setContentText(header:string, undertext:string){
        this.header = header;
        this.undertext = undertext;

    }

    protected setLoggedInformations(){
        this.setContentText("HI! "+this._defaultService.userName, "Let's get started!")
    }

    protected setUnLoggedInformations(){
        this.setContentText("FIRST WAS THE WORD", "Show your text in a cloud")

    }

}
