import { Component, OnInit } from '@angular/core';
import { Base } from './../Base';
import { BaseService } from './../base.service';

@Component({
    selector: 'navigation-bar',
    templateUrl: './header.component.html',
    providers: [BaseService]
})
export class HeaderComponent extends Base implements OnInit {


    constructor(protected _baseService : BaseService) {
        super(_baseService);
        let Default
    }

    ngOnInit() {
    }
}

