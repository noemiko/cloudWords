import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../cloud/Word';

@Component({
  selector: 'cloud-data-grid',
  templateUrl: './cloud-data-grid.component.html',
  styleUrls: ['./cloud-data-grid.component.css']
})
export class CloudDataGridComponent implements OnInit {
@Input() data:Word[];
  constructor() { }

  ngOnInit() {
  }

}
