import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { CloudService } from './../cloud-service.service';

@Component({
  selector: 'input-data-text',
  templateUrl: './input-data-text.component.html',
  styleUrls: ['./input-data-text.component.css']
})
export class InputDataTextComponent implements OnInit {
@Input() textData:string;

  private placeHolder = `Paste text using csv format if you want specify size:
'word,20,word1,10'
Other way input just text:
'Lorem ipsum lorem'`;

  constructor(private cloudService:CloudService ) { 
    
  }

  ngOnInit() {
  }
  onChange(changes:any) {
    this.cloudService.textForCloud = this.textData;
  }

}
