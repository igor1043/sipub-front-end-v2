import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { AccountComponent } from './general/admin/account/account.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { LayoutComponent } from '../pages/layout/layout.component';
import { LoginComponent } from './general/login/login.component';
import { ListConsumerUnitComponent } from './modules/consumer-unit/list-consumer-unit/list-consumer-unit.component';
import { CreateConsumerUnitComponent } from './modules/consumer-unit/create-consumer-unit/create-consumer-unit.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './general/user-profile/user-profile.component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    data: { breadcrumb: 'Login' } 
  },
  { 
    path: 'page-not-found', 
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Página não encontrada' } 
  },
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Dashboard' } 
      },
      { 
        path: 'admin/account', 
        component: AccountComponent, 
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Lista de Contas' } 
      },
      { 
        path: 'user-profile', 
        component: UserProfileComponent, 
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Perfil do Usuário' } 
      },
      { 
        path: 'consumer-unit',
        data: { breadcrumb: 'Unidade Consumidora' },
        children: [
          { 
            path: 'list', 
            component: ListConsumerUnitComponent,
            canActivate: [AuthGuard],
            data: { breadcrumb: 'Lista de Unidades' } 
          },
          { 
            path: 'add', 
            component: CreateConsumerUnitComponent,
            canActivate: [AuthGuard],
            data: { breadcrumb: 'Criar Unidade' } 
          },
          { 
            path: 'edit/:id', 
            component: CreateConsumerUnitComponent,
            canActivate: [AuthGuard],
            data: { breadcrumb: 'Editar' } 
          }
        ]
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
    ],
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'page-not-found' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }