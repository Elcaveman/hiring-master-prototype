import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activity-id',
  templateUrl: './activity-id.component.html',
  styleUrls: ['./activity-id.component.scss']
})
export class ActivityIdComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log(params) );
}
}
