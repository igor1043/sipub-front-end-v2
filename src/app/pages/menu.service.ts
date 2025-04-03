import { Injectable } from '@angular/core';
import { Module, ModuleType } from 'app/core/interfaces/module.interface';
import { ModulesMockService } from 'app/core/mocks/modules.mock';
import { firstValueFrom } from 'rxjs';

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

  constructor(private modulesMockService: ModulesMockService) { }

  private fixedMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: '/assets/icons/ic_dashboard.svg',
      route: '/dashboard',
    },
    {
      title: 'Administração',
      icon: '/assets/icons/ic_person.svg',
      subItems: [
        { title: 'Contas', route: '/admin/account' },
        { title: 'Cidadão', route: '/admin/citizen' },
        { title: 'Usuários', route: '/admin/users' },
        {
          title: 'Cadastros', subItems: [
            { title: 'Pessoa Física', route: '/admin/natural-person' },
            { title: 'Pessoa Jurídica', route: '/admin/corporate-entity' }
          ]
        },
        {
          title: 'Controle de Acesso', subItems: [
            { title: 'Papeís', route: '/admin/natural-person' },
            { title: 'Privilégios', route: '/admin/corporate-entity' }
          ]
        },
        {
          title: 'Registros Cadastrais', subItems: [
            { title: 'Parâmetros Geográficos', route: '/admin/natural-person' },
            { title: 'Dados Pessoais', route: '/admin/natural-person' },
            { title: 'Empresas', route: '/admin/corporate-entity' },
            { title: 'Transportes', route: '/admin/corporate-entity' },
            { title: 'Unidades', route: '/admin/corporate-entity' },
            { title: 'Atribuições', route: '/admin/corporate-entity' },
          ]
        },
        { title: 'Credênciais', route: '/admin/credentials' },
      ],
    },
    {
      title: 'Georreferenciamento',
      icon: '/assets/icons/ic_geo.svg',
      route: '/gestor',
    },
    {
      title: 'Gestor',
      icon: '/assets/icons/ic_manager.svg',
      subItems: [
        { title: 'Relatórios', route: '/manager/reports' },
      ],
    },
  ];

  getMenuItems(): MenuItem[] {
    const moduleItems = this.modulesMockService.getModulesActive().map(module => ({ ...this.getModuleMenuConfig(module) }));
    return [...this.fixedMenuItems, ...moduleItems];
  }

  private getModuleMenuConfig(module: Module): MenuItem {
    switch (module.id) {
      case ModuleType.PublicLighting.id:
        return {
          title: module.name,
          icon: module.iconUrl,
          subItems: [
            { title: 'Mapa', route: '/public-lighting/map' },
            { title: 'Ordens de Serviço', route: '/public-lighting/service-orders' }
          ],
          isModule: true
        };

      case ModuleType.ConsumerUnit.id:
        return {
          title: module.name,
          icon: module.iconUrl,
          subItems: [
            { title: 'Lista de Unidades', route: '/consumer-unit/list' },
            { title: 'Cadastro de Unidade', route: '/consumer-unit/add' },
            { title: 'Monitoramento Mensal', route: '/consumer-unit/monthly-monitoring' },
            { title: 'Parâmetros', route: '/unidade-consumidora/subitem2' },
          ],
          isModule: true
        };
      case ModuleType.WaterSupply.id:
        return {
          title: module.name,
          icon: module.iconUrl,
          subItems: [
            { title: 'Monitoramento', route: '/water-supply/monitoring' }
          ],
          isModule: true
        };

      case ModuleType.PublicSecurity.id:
        return {
          title: module.name,
          icon: module.iconUrl,
          subItems: [
            { title: 'Ocorrências', route: '/public-security/occurrences' }
          ],
          isModule: true
        };

      default:
        return {
          title: module.name,
          icon: module.iconUrl,
          subItems: [
            { title: 'Ocorrências', route: '/public-security/occurrences' }
          ],
          isModule: true
        };
    }
  }
}
