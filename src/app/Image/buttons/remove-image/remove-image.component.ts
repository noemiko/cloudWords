import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from './../../Image.service';
@Component({
  selector: 'remove-image',
  templateUrl: 'remove-image.component.html',
  styleUrls: ['remove-image.component.css']
})
export class RemoveImageComponent implements OnInit {
  @Input() imageFileName='';
  constructor(private _imageService : ImageService) { }

  ngOnInit() {
  }
  private remove():void {

    this._imageService.remove(this.imageFileName).subscribe(

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
