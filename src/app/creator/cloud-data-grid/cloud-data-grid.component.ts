import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../cloud/Word';

@Component({
  selector: 'cloud-data-grid',
  templateUrl: './cloud-data-grid.component.html',
  styleUrls: ['./cloud-data-grid.component.css']
})
export class CloudDataGridComponent implements OnInit {

  isAvailable = true;

  private isRotated(degrees:string):boolean{
    if(Number(degrees)>0){
      return true;
    }
    return false;
  }
@Input() data:Word[];
  constructor() { }

  ngOnInit() {
  }

}
