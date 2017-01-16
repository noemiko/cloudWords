import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'download-canvas',
  templateUrl: 'download-canvas.component.html',
  styleUrls: ['download-canvas.component.css']
})
export class DownloadCanvasComponent implements OnInit {
  @Input() imageUrl:any='';
  @Input() imagePath:any='';

  constructor() { }

  ngOnInit() {

  }
  download(){
    if(this.imageUrl ===''){
        window.open(this.imagePath);
    }
    else {
      let imageToDownload = this.imageUrl.replace("image/png", "image/octet-stream");
      window.location.href = imageToDownload;
    }
  }
}
