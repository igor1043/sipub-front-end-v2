import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { AccountComponent } from './general/admin/account/account.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { LayoutComponent } from '../pages/layout/layout.component';
import { LoginComponent } from './general/login/login.component';
import { ListConsumerUnitComponent } from './modules/consumer-unit/list-consumer-unit/list-consumer-unit.component';
import { CreateConsumerUnitComponent } from './modules/consumer-unit/create-consumer-unit/create-consumer-unit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent }, // Rotas sem LayoutComponent
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin/account', component: AccountComponent },
      { path: 'consumer-unit/list', component: ListConsumerUnitComponent },
      {path: 'consumer-unit/add', component: CreateConsumerUnitComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Rota padrão para o layout
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Rota padrão da aplicação
  { path: '**', redirectTo: 'page-not-found' }, // Rota curinga para páginas não encontradas (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }