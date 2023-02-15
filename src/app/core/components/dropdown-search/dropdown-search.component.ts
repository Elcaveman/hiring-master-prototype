import { Component, Input } from '@angular/core';
import { Person } from '../../models/person';
import { TextMethodsService } from '../../services/utils/text-methods.service';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss']
})
export class DropdownSearchComponent {
  @Input() participants:Person[] = [];
  bgColorClasses = ["bg-megenta-3","bg-cyan-3","bg-deepPurple-3"];// TODO: add default color for user to customise
  constructor(public textMethodsService:TextMethodsService){}

}
