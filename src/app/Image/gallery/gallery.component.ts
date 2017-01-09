import { Component, OnInit } from '@angular/core';
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

  constructor(private _imageService : ImageService, private sanitizer: DomSanitizer) {

    this.initGallery();
   // this.createGallery(this.getArrayData())
   }

  ngOnInit() {
  }


   private initGallery():void {
      
      this._imageService.getGallery().subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    private handleResponse(response){
      console.log(response)
      if(response.error ===false){
        this.createGallery(response.message);
      }
 
      if(response.error ==true){
        //this.info = response.message;
      }
    }
    private createGallery(imagesData:any[]){
        imagesData.forEach(x=>{
          console.log(x.image.length)
          x.image =  this.sanitizer.bypassSecurityTrustUrl(x.image);
        })
     
     this.imageList=imagesData;
    }



}