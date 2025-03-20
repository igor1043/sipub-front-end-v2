import { Component, ChangeDetectorRef, Input, OnInit, SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../ui-components/svg-icon/svg-icon.component';
import { MenuService, MenuItem } from '../../../pages/menu.service';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { User } from 'app/core/local-storage/models/user.model';
import { UserService } from 'app/core/services/user/user.service';

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
  
  currentUser: User | null = null;
  userPhotoLink: string | null = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.currentUser = this.localStorageService.getCurrentUser();


      this.userService.getUserPhoto(1337).subscribe(
        (response) => {
          this.userPhotoLink = response.data.link; // Armazena o link da foto
          this.cdr.detectChanges(); // Força a atualização da view
        },
        (error) => {
          console.error('Erro ao carregar a foto do usuário:', error);
        }
      );


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
