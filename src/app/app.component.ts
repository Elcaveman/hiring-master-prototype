import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed : boolean = false;
  triggerCollapseEvent($event:boolean){
    this.isCollapsed = $event;
  }
}
