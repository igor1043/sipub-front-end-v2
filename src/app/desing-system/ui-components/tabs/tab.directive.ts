import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCustomTab]'
})
export class CustomTabDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}