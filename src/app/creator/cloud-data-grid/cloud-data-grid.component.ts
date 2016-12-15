import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Word } from '../cloud/Word';
import { Fonts } from '../cloud/Fonts';

@Component({
  selector: 'cloud-data-grid',
  templateUrl: './cloud-data-grid.component.html',
  styleUrls: ['./cloud-data-grid.component.css']
})
export class CloudDataGridComponent implements OnInit {
@ViewChild("form") form: any;
@Input() data:Word[];
@Output() dataModifiedByUser = new EventEmitter();
  private isAvailable = true;
  private fonts = Fonts.FontsList;

  private isRotated(degrees:string):boolean{
    if(Number(degrees)>0){
      return true;
    }
    return false;
  }
onBlurMethod(){
  console.log('Blured')
   this.dataModifiedByUser.emit(this.data);
}
  onChange(values) {
    console.log(values);
  }

  public get Data():Word[]{
return this.data;
}

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
