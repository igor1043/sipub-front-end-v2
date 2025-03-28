import { Component } from '@angular/core';
import { SidebarComponent } from '../../desing-system/ui-components/sidebar/sidebar.component';
import { TopBarComponent } from '../../desing-system/ui-components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterModule, TopBarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarMinimized = false;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }

  updateSidebarState(minimized: boolean) {
    this.isSidebarMinimized = minimized;
  }
}
