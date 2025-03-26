import { Component, EventEmitter, Output, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { filter, map } from 'rxjs/operators';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';
import { AccountService } from 'app/core/services/account/account.service';
import { firstValueFrom } from 'rxjs';
import { AccountConfigurationResponse } from 'app/core/services/account/models/account.image.model';
import { DialogType, MessageDialogComponent } from "../message-dialog/message-dialog.component";



@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, MessageDialogComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @HostBinding('class.dark-theme') isDarkTheme = false;

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  DialogType = DialogType;
  @ViewChild('logoutDialog') logoutDialog!: MessageDialogComponent;

  breadcrumbService: any;
  breadcrumbs: string[] = [];
  accountAlias?: string;
  urlImage?: string;
  imageLoadError = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const account = this.localStorageService.getCurrentAccount()


    this.themeService.isDarkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs();
      });

    this.breadcrumbs = this.buildBreadcrumbs();

    this.accountAlias = account?.alias;
    this.getImageAccount(account?.id_account!!)
  }

  private buildBreadcrumbs(): string[] {
    const breadcrumbs: string[] = [];
    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;

    while (currentRoute) {
      const routeData = currentRoute.snapshot.data;
      if (routeData['breadcrumb']) {
        breadcrumbs.push(routeData['breadcrumb']);
      }
      currentRoute = currentRoute.firstChild;
    }
    return breadcrumbs;
  }


  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.logoutDialog.open();
  }

  navigateToHome() {
    this.router.navigate(['/dashboard']);
  }


  async getImageAccount(id_account: number) {
    try {
      const response: AccountConfigurationResponse = await firstValueFrom(this.accountService.getAccountImageConfiguration(id_account));
      this.urlImage = response.data.payload[0].signed_url;
      this.imageLoadError = false;
    } catch (error) {
      this.urlImage = undefined;
      this.imageLoadError = true;
      console.error('Erro ao baixar imagem da conta:', error);
    }
  }
  handleImageError() {
    this.imageLoadError = true;
  }

  // Adicione este método para tratar a confirmação
  confirmLogout() {
    this.localStorageService.logout();
    this.router.navigate(['/login']);
  }
}
