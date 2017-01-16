import { Component, OnInit, Input, Output, EventEmitter , OnChanges} from '@angular/core';
import { ImageService } from './../../Image.service';

@Component({
  selector: 'share',
  templateUrl: 'share.component.html',
  styleUrls: ['share.component.css'],
  providers:[ImageService]
})
export class ShareComponent implements OnInit, OnChanges {
  @Input() imageFileName='';
  private information:string;
  @Output() textInformation = new EventEmitter();

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
          var width = window.innerWidth * 0.66 ;
          // define the height in
          var height = width * window.innerHeight / window.innerWidth ;
         // window.open('./#/share/123','newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
        console.log(response)
          this.information = 'Use this link to share :'+window.location.hostname+window.location.pathname+'#/share/'+response.message;
          this.textInformation.emit(this.information);
      }
 
      if(response.error ==true){
          this.information = response.message;
      }

    }

    ngOnChanges(changes:any) {

    }

}
