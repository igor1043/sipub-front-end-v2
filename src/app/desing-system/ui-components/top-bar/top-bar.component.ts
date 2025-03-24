import { Component, EventEmitter, Output, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { filter, map } from 'rxjs/operators';
import { LocalStorageService } from 'app/core/local-storage/LocalStorageService';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @HostBinding('class.dark-theme') isDarkTheme = false;

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  breadcrumbService: any;
  breadcrumbs: string[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs();
      });

    this.breadcrumbs = this.buildBreadcrumbs();
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
    this.localStorageService.logout();
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/dashboard']);
  }
}