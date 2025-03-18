import { Component, Input, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { CustomTabDirective } from './tab.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
  @Input() tabs: string[] = [];
  @ContentChildren(CustomTabDirective) templates!: QueryList<CustomTabDirective>;

  selectedIndex = 0;

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0 && this.templates.length === this.tabs.length) {
      this.selectTab(0);
    }
  }

  getSelectedTemplate(): TemplateRef<any> | null {
    const selectedTemplate = this.templates.get(this.selectedIndex);
    return selectedTemplate ? selectedTemplate.templateRef : null;
  }
}