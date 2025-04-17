import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-info-date',
  templateUrl: './container-info-date.component.html',
  styleUrls: ['./container-info-date.component.css']
})
export class ContainerInfoDateComponent implements OnInit {

  @Input() creationDate: string | Date = '';
  @Input() updateDate: string | Date = '';
  
  constructor() { }

  ngOnInit() {
  }

}
