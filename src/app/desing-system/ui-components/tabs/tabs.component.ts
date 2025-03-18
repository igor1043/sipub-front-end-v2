import { Component, ContentChildren, Input, QueryList, TemplateRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  imports: [CommonModule]
})
export class TabsComponent implements AfterContentInit {
  @Input() tabs: string[] = [];
  @Input() size: 'large' | 'medium' | 'small' = 'medium'; // Propriedade size com valor padrão 'medium'
  @ContentChildren('appCustomTab') tabTemplates!: QueryList<TemplateRef<any>>;
  activeTab = 0;
  activeTabTemplate?: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.setActiveTab(0);
  }

  selectTab(index: number): void {
    this.setActiveTab(index);
  }

  private setActiveTab(index: number): void {
    this.activeTab = index;
    const templates = this.tabTemplates.toArray();
    this.activeTabTemplate = templates[index];
  }
}