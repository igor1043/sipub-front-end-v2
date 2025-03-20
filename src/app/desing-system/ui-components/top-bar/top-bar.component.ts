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
  breadcrumbs: Array<{ label: string, url: string }> = [];

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

    // Monitora as mudanças de rota para atualizar o breadcrumb
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map(() => this.activatedRoute),
      map(route => {
        let child = route;
        while (child.firstChild) {
          child = child.firstChild;
        }
        return child;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe(route => {
      this.breadcrumbs = this.buildBreadcrumbs(route);
    });
  }

  buildBreadcrumbs(route: ActivatedRoute): Array<{ label: string, url: string }> {
    let currentRoute: ActivatedRoute = route;
    const breadcrumbs: Array<{ label: string, url: string }> = [];
    let url = '';

    while (currentRoute) {
      if (currentRoute.snapshot.url.length) {
        const segment = currentRoute.snapshot.url.map(segment => segment.path).join('/');
        url += `/${segment}`;
        const label = currentRoute.snapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.unshift({ label, url });
        }
      }
      currentRoute = currentRoute.parent!;
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