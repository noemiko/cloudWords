import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudGenerator } from './cloud/cloudGenerator';
import { Words } from './cloud/Words';
import { Word } from './cloud/Word';
import { Authentication } from '../base/Authentication';
import { AuthenticationService } from '../base/authentication.service';

@Component({
    selector: 'creator',
    templateUrl: './creator.component.html',
    styleUrls: ['./creator.component.css']
})
export class CreatorComponent extends Authentication implements OnInit {
    private canvaCloud: CanvasRenderingContext2D;
    private textToManipulate:string;//output from text input
    private canvasUrl = '' ;
    private words:Words = new Words()
    private ShowInput:boolean = false;
    private ShowDataGrid:boolean = false;
    private textStructure:Word[];
    private isUserLogged:boolean;

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
    constructor(protected _baseService : AuthenticationService) {
        super(_baseService);
        this.isLogged()
        _baseService.userLoggedIn.subscribe(loggedIn => {
            this.isUserLogged = loggedIn;
        });

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
