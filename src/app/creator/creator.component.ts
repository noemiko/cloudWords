import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudGenerator } from './cloud/cloudGenerator';
import { Words } from './cloud/Words';
import { Word } from './cloud/Word';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  private canvaCloud: CanvasRenderingContext2D;
  private textToManipulate:string;
  private canvasUrl = '' ;
  private words:Words = new Words()
  private ShowInput:boolean = false;
  private ShowDataGrid:boolean = false;
  private textStructure:Word[];
  @ViewChild("canvas") canvas: ElementRef; 
  @ViewChild("canvasImage") canvasImage: HTMLImageElement; 

  
  private showInput():void{
    this.ShowInput=!this.ShowInput;
  }

  private showDataGrid():void{
    this.ShowDataGrid=!this.ShowDataGrid;
  }

  private generateCloud():void{
   let cloud = new CloudGenerator(this.words.getTextStructure(), this.canvaCloud);
   this.canvasUrl = cloud.getImageUri();
  }
  constructor() { 
  }

 private setTextToManipulate(input:string){
   this.textToManipulate = input;
   this.words.generateStructure(this.textToManipulate);
   this.textStructure = this.words.getTextStructure();
  }

  ngOnInit() {
 this.canvaCloud = this.canvas.nativeElement.getContext("2d");
 //this.canvaCloud.scale(0.5,0.5);
  }

}
