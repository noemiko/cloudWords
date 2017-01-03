import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CloudService } from './../cloud-service.service';

@Component({
  selector: 'input-data-text',
  template: `
  <div class="form-horizontal">
  <div class="form-group">
    <div class="col-md-12">
      <textarea [(ngModel)]="textData" class="form-control" 
      rows="5" placeholder="{{placeHolder}}" 
      (ngModelChange)="onChange($event)"></textarea>
      </div>
   </div>
</div>`,
  styleUrls: ['./input-data-text.component.css']
})
export class InputDataTextComponent implements OnInit {
@Input() textData:string = "test test tes"
@Output() textToManipulate = new EventEmitter();

  private placeHolder = `Paste text here`;

  constructor(private cloudService:CloudService ) { 
   
  }

  ngOnInit() {
  }
  onChange(changes:any) {
    this.textToManipulate.emit(this.textData);
  }

}