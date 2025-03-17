import { Injectable } from '@angular/core';

export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  subItems?: MenuItem[];
  isOpen?: boolean;
  isModule?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenuItems(): MenuItem[] {
    return [
      {
        title: 'Dashboard',
        icon: '/assets/icons/ic_dashboard.svg',
        route: '/dashboard',
      },
      {
        title: 'Administração',
        icon: '/assets/icons/ic_person.svg',
        subItems: [
          { title: 'Conta', route: '/admin/account' },
          { title: 'Subitem 2', route: '/administracao/subitem2' },
        ],
      },
      {
        title: 'Gestor',
        icon: '/assets/icons/ic_manager.svg',
        route: '/gestor',
      },
      {
        title: 'Iluminação Pública',
        icon: '/assets/ic_modules/ic_public_illumination.svg',
        subItems: [
          { title: 'Mapa', route: '/iluminacao-publica/subitem1' },
          { title: 'Ordem de serviço', route: '/iluminacao-publica/subitem2' },
        ],
        isModule: true,
      },
      {
        title: 'Unidade Consumidora',
        icon: '/assets/ic_modules/ic_consumer_unit.svg',
        subItems: [
          { title: 'Lista de Unidades', route: '/consumer-unit/list' },
          { title: 'Cadastro de Unidade', route: '/consumer-unit/add' },
          { title: 'Monitoramento Mensal', route: '/unidade-consumidora/subitem2' },
          { title: 'Parâmetros', route: '/unidade-consumidora/subitem2' },
        ],
        isModule: true,
      },
      {
        title: 'Abastecimento de Água',
        icon: '/assets/ic_modules/ic_water_supply.svg',
        subItems: [
          { title: 'Subitem 1', route: '/abastecimento-agua/subitem1' },
          { title: 'Subitem 2', route: '/abastecimento-agua/subitem2' },
        ],
        isModule: true,
      },
    ];
  }
}