import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  isCollapsed:boolean;
  @Input() collapsed :boolean=false;// initial state
  @Output() collapseEvent = new EventEmitter<boolean>;
  constructor(){
    this.isCollapsed = this.collapsed;
  }
  triggerCollapseEvent($event:MouseEvent){
    console.log("triggerCollapseEvent",$event)
    this.isCollapsed = !this.isCollapsed
    this.collapseEvent.emit(this.isCollapsed)
  }
}
