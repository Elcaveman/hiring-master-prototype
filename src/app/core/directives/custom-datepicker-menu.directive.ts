import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Host, Self, Optional } from '@angular/core';
@Directive({
  selector: '[customDatepickerMenu]'
})
export class CustomDatepickerMenuDirective {
  
  constructor(
    private viewContainer: ViewContainerRef) {
    // Now you can access specific instance members of host directive
    // also you can override specific methods from original host directive so that this specific instance uses your method rather than their original methods.
    // console.log(this.viewContainer);
  }
}
