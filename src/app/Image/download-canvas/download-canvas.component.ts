import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'download-canvas',
  templateUrl: './download-canvas.component.html',
  styleUrls: ['./download-canvas.component.css']
})
export class DownloadCanvasComponent implements OnInit {
  @Input() imageUrl:any='';

  constructor() {console.log(this.imageUrl) }

  ngOnInit() {
    console.log(this.imageUrl)
  }
  download(){
    console.log(this.imageUrl)
    let imageToDownload = this.imageUrl.replace("image/png", "image/octet-stream");
    window.location.href = imageToDownload;
  }
}
