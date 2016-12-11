import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudGenerator } from './cloud/cloudGenerator';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  private canvaCloud: CanvasRenderingContext2D;
  private textToManipulate:string;
  private canvasUrl = '' ;

  private ShowInput:boolean = false;
  @ViewChild("canvas") canvas: ElementRef; 
  @ViewChild("canvasImage") canvasImage: HTMLImageElement; 

  
  private showInput():void{
    this.ShowInput=!this.ShowInput;
  }
  private generateCloud():void{
   let cloud = new CloudGenerator(this.textToManipulate, this.canvaCloud);
   this.canvasUrl = cloud.getImageUri();
  }
  constructor() { 
  }

 private setTextToManipulate(input:string){
   this.textToManipulate = input;
  }

  ngOnInit() {
 this.canvaCloud = this.canvas.nativeElement.getContext("2d");
 //this.canvaCloud.scale(0.5,0.5);

  }

}
