import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopNavDisplayModel } from './top-navbar.models';
import { FakeDataService } from '../../services/fake-data.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  @Input() collapsed :boolean=false;// initial state
  @Output() collapseEvent = new EventEmitter<boolean>;
  isCollapsed:boolean;
  displayData ?: Observable<TopNavDisplayModel>;
  constructor(private fakeDataService_:FakeDataService){
    this.isCollapsed = this.collapsed;
    this.displayData = fakeDataService_.titleData().pipe(
      map(x => new TopNavDisplayModel(x.title,x.state))
    )
  }
  triggerCollapseEvent($event:MouseEvent){
    this.isCollapsed = !this.isCollapsed
    this.collapseEvent.emit(this.isCollapsed)
  }
  
}
