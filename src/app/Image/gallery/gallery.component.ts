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
    @ViewChild('allImages') allImages:ElementRef;

  constructor(private _imageService : ImageService, private sanitizer: DomSanitizer) {

    this.initGallery();
   // this.createGallery(this.getArrayData())
   }

  ngOnInit() {
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
      }

      if(response.error ==true){
        //this.info = response.message;
      }
    }



}