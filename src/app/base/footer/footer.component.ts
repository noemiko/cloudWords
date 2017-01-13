import { Component, OnInit } from '@angular/core';
import { Base } from './../Base';
import { BaseService } from './../base.service';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    providers: [BaseService]
})
export class FooterComponent extends Base implements OnInit {

    constructor(protected _defaultService : BaseService) {
        super(_defaultService);
        this.isLogged();
    }

    ngOnInit() {
    }
}
