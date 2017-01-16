import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'share-window',
    templateUrl: 'share-window.component.html',
    styleUrls: ['share-window.component.css']
})
export class ShareWindowComponent implements OnInit {
    private hash:string;
    private id:string;
    private imageUrl:string;

    constructor(private _router:ActivatedRoute) {
        this.hash =_router.snapshot.params['hash'];
        this.id =_router.snapshot.params['id'];
        this.setImageUrl();
    }

    setImageUrl(){
        this.imageUrl ='./../backend/img/'+this.id+'/'+this.hash+'.png';
    }

    ngOnInit() {
    }

}
