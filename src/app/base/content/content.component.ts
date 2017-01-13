import { Component, OnInit } from '@angular/core';
import { Base } from './../Base';
import { BaseService } from './../base.service';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    providers: [BaseService]
})
export class ContentComponent extends Base implements OnInit {
    private header:string;
    private undertext:string;

    constructor(protected _defaultService : BaseService) {
        super(_defaultService);


        this.isLogged();
    }

    ngOnInit() {
    }

    handleResponse(response){
        console.log(response)
        this.isUserLogged = true;
        this.userName = response.message.login;
        this.setCorrectText();
    }

    private setCorrectText(){
        console.log(this.isUserLogged);
        if(this.isUserLogged!==true){
            this.setContentText("FIRST WAS THE WORD", "Show your text in a cloud")
        }else{
            this.setContentText("HI! "+this.userName, "Let's get started!")
        }

    }

    private setContentText(header:string, undertext:string){
        this.header = header;
        this.undertext = undertext;

    }

}
