import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudGenerator } from './cloud/cloudGenerator';
import { Words } from './cloud/Words';
import { Word } from './cloud/Word';
import { Base } from '../base/Base';
import { BaseService } from '../base/base.service';

@Component({
    selector: 'creator',
    templateUrl: './creator.component.html',
    styleUrls: ['./creator.component.css'],
    providers:[BaseService]
})
export class CreatorComponent extends Base implements OnInit {
    private canvaCloud: CanvasRenderingContext2D;
    private textToManipulate:string;//output from text input
    private canvasUrl = '' ;
    private words:Words = new Words()
    private ShowInput:boolean = false;
    private ShowDataGrid:boolean = false;
    private textStructure:Word[];

    @ViewChild("canvas") canvas: ElementRef;
    @ViewChild("canvasImage") canvasImage: HTMLImageElement;
    @ViewChild("dataGrid") dataGrid: any;

    private showInput():void{
        this.ShowInput=!this.ShowInput;
    }

    private showDataGrid():void{
        this.ShowDataGrid=!this.ShowDataGrid;
    }

    private generateCloud():void{
        console.log(this.textStructure)
        if (this.textStructure != undefined){
            let cloud = new CloudGenerator(this.textStructure, this.canvaCloud);
            this.canvasUrl = cloud.getImageUri();
        }

    }
    constructor(protected _baseService : BaseService) {
        super(_baseService);
        this.isLogged()
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
