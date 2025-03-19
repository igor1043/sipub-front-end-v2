import { Component, ChangeDetectorRef, Input, OnInit, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../ui-components/svg-icon/svg-icon.component';
import { MenuService, MenuItem } from '../../../pages/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() minimized = false;
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  toggleSubmenu(item: MenuItem): void {
    item.isOpen = !item.isOpen;
    this.cdr.detectChanges();
    this.minimized = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minimized'] && this.minimized) {
      this.closeAllSubmenus();
    }
  }

  closeAllSubmenus(): void {
    this.menuItems.forEach(item => item.isOpen = false);
    this.cdr.detectChanges();
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.title;
  }
}