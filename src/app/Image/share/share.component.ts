import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from './../Image.service';
import { Image } from './../Image';

@Component({
  selector: 'share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
  providers:[ImageService]
})
export class ShareComponent implements OnInit {
  @Input() imageFileName='';
  constructor(private _imageService : ImageService) { }

  ngOnInit() {
  }
   private share():void {

      this._imageService.share(this.imageFileName).subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }
 
    private handleResponse(response){

      if(response.error ==false){
        console.log(response)
      }
 
      if(response.error ==true){
        //this.info = response.message;
      }
    }

}
