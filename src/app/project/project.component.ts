import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  activeLinePosition: string;
  activeLineColor: string;
  activeLineVisible: boolean = false;
  
  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  moveActiveLine(position: number) {

    switch(position) {
      case 1:
        this.activeLineColor ="#339C53";
        break;
      case 2:
        this.activeLineColor = "#989c33";
        break;
      case 3:
        this.activeLineColor = "#ce6619";
        break;
      default:
        this.activeLineColor = "#9c3333";
      
    }
    let newPosition = position * 6;

    this.activeLinePosition = `translateY(${newPosition}rem)`;
  }

}

