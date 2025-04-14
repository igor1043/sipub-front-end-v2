import { Component, ChangeDetectorRef, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() minimizedChange = new EventEmitter<boolean>(); // Emissor de eventos para o pai


  menuItems: MenuItem[] = [];

  private collapseTimeout: any;

  currentUser: User | null = null;
  userPhotoLink: string | null = null;

  isHoveringUser = false;
  isUserAreaActive = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.currentUser = this.localStorageService.getCurrentUser();

    if (this.currentUser?.id_person !== undefined) {
      this.userService.getUserPhoto(this.currentUser?.id_person).subscribe(
        (response) => {
          this.userPhotoLink = response.data.link; 
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erro ao carregar a foto do usuário:', error);
        }
      );
    }
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

  toggleMenuItem(item: MenuItem): void {
    if (this.minimized) {
      this.expandSidebar(); // Expande o sidebar primeiro
      // Aguarda a próxima detecção de mudanças para garantir a expansão
      setTimeout(() => {
        if (this.hasSubItems(item)) {
          item.isOpen = true;
          this.closeSiblingSubmenus(item);
        } else if (item.route) {
          this.navigateTo(item.route);
        }
        this.cdr.detectChanges();
      }, 0);
      return;
    }
  
    // Lógica original para sidebar expandido
    if (this.hasSubItems(item)) {
      item.isOpen = !item.isOpen;
      this.closeSiblingSubmenus(item);
    } else if (item.route) {
      this.navigateTo(item.route);
    }
    this.cdr.detectChanges();
  }

  hasSubItems(item: MenuItem): boolean {
    return !!item.subItems && item.subItems.length > 0;
  }

  private closeSiblingSubmenus(currentItem: MenuItem): void {
    const parentArray = this.findParentArray(currentItem);
    if (parentArray) {
      parentArray.forEach(item => {
        if (item !== currentItem && item.isOpen) {
          item.isOpen = false;
          this.closeAllChildSubmenus(item);
        }
      });
    }
  }

  private closeAllChildSubmenus(item: MenuItem): void {
    if (item.subItems) {
      item.subItems.forEach(subItem => {
        subItem.isOpen = false;
        this.closeAllChildSubmenus(subItem);
      });
    }
  }

  private findParentArray(item: MenuItem): MenuItem[] | null {
    // Implemente a lógica para encontrar o array pai se necessário
    // Para simplificar, estamos considerando apenas dois níveis aqui
    return this.menuItems;
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

  navigateToUserProfile() {
    this.isUserAreaActive = true;
    setTimeout(() => this.isUserAreaActive = false, 200);
    this.router.navigate(['/user-profile]']);
  }

  expandSidebar(): void {
    clearTimeout(this.collapseTimeout);
    this.minimized = false;
    this.minimizedChange.emit(this.minimized); // Notifica o componente pai
    this.cdr.detectChanges();
  }

  collapseSidebar(): void {
    this.collapseTimeout = setTimeout(() => {
      this.minimized = true;
      this.minimizedChange.emit(this.minimized);
      this.cdr.detectChanges();
    }, 500); // Pequeno atraso para evitar minimizar rapidamente
  }
}
