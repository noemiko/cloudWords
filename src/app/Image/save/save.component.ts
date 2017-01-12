import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImageService } from './../Image.service';
import { Image } from './../Image';


import 'rxjs/Rx';

@Component({
  selector: 'save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
  providers:[ImageService]
})
export class SaveComponent implements OnInit {
    @Input() imageUrl='';
    @ViewChild('inputFileName') input:any;
    private showInput:boolean = false;
    private info:string;

    constructor(private _imageService : ImageService) { }
    ngOnInit() { }

    private showHideInput(){
      this.showInput = !this.showInput;
    }

    private saveImage():void {
      const image = new Image();
      image.name = this.getFileName();
      image.url = this.imageUrl;
      
      this._imageService.save(image).subscribe(
        
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
    }

    private getFileName(){

      if (this.input.nativeElement.value===""){
        return this.getRandomFileName()
      }
      else return this.input.nativeElement.value;
    }

    private getRandomFileName(){
      let n = Math.random()*1e17;
      return (n+"").substr(1,16);
    }
 
    private handleResponse(response){
      console.log(response)
      if(response.error ==false){
        console.log(response)
      }
 
      if(response.error ===true){
        this.info = response.message;
      }
    }

}

