import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  private ShowInput:boolean = false;

  private showInput():void{
    this.ShowInput=!this.ShowInput;
  }
  constructor() { }

  ngOnInit() {

  }

}
