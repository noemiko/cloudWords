import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from './../Image.service';
//import { Image } from './../Image';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'user-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    providers:[ImageService ]
})

export class UserGalleryComponent implements OnInit {
    private imageList: any[] = [];
    private textInformation:string;
    private urlToShare:string;
    private biggerImage:string='';

    @ViewChild('allImages') allImages:ElementRef;

    constructor(private _imageService : ImageService, private sanitizer: DomSanitizer) {
        this.initGallery();
    }

    ngOnInit() {
    }

    private openBigger(imageUrl:string){
        this.biggerImage=imageUrl;
        this.textInformation = '';
    }
    private removeFromGUI(event:any){
        event.path[5].hidden = true;
    }

    private initGallery():void {

        this._imageService.getGallery().subscribe(

            response => this.handleResponse(response),
            error => this.handleResponse(error)
        );
    }

    private handleResponse(response){
        if(response.error ===false){
            this.imageList=response.message;
            this.textInformation = 'Gallery loaded'
        }

        if(response.error ==true){
            this.textInformation = response.message;
        }
    }

    setTextInformation(input){
        console.log(input);
        this.setInformationStructure(input);
        console.log(window.location.pathname)
    }

    private setInformationStructure(text:string){
        const divideCharPosition = text.indexOf(":");
        if(divideCharPosition === -1){
            this.textInformation =  text;
        }
        else{
            this.urlToShare = text.slice(divideCharPosition+1,-4);
            this.textInformation = text.slice(0 ,divideCharPosition+1);
        }
    }



}