export interface Module {
  id: number;
  name: string;
  iconUrl: string;
}

export const ModuleType = {
  WaterSupply: {
    id: 4,
    name: "Abastecimento de Água",
    iconUrl: "/assets/ic_modules/ic_water_supply.svg",
  },
  TreePruning: {
    id: 12,
    name: "Corte e Poda de Árvores",
    iconUrl: "/assets/ic_modules/ic_tree_pruning.svg",
  },
  DebrisCollection: {
    id: 5,
    name: "Coleta de Entulho",
    iconUrl: "/assets/ic_modules/ic_debris_collection.svg",
  },
  GarbageCollection: {
    id: 6,
    name: "Coleta de Lixo",
    iconUrl: "/assets/ic_modules/ic_garbage_collection.svg",
  },
  AnimalControl: {
    id: 15,
    name: "Controle de Animais",
    iconUrl: "/assets/ic_modules/ic_animal_control.svg",
  },
  ReportCrime: {
    id: 17,
    name: "Denunciar Crime",
    iconUrl: "/assets/ic_modules/ic_report_crime.svg",
  },
  MunicipalConsortium: {
    id: 3,
    name: "Consórcio Municipal",
    iconUrl: "/assets/ic_modules/ic_municipal_consortium.svg",
  },
  DengueOutbreaks: {
    id: 9,
    name: "Focos de Dengue",
    iconUrl: "/assets/ic_modules/ic_dengue_outbreaks.svg",
  },
  PublicLighting: {
    id: 1,
    name: "Iluminação Pública",
    iconUrl: "/assets/ic_modules/ic_public_illumination.svg",
  },
  RoadMaintenance: {
    id: 7,
    name: "Manutenção de Ruas",
    iconUrl: "/assets/ic_modules/ic_road_maintenance.svg",
  },
  OtherMaintenance: {
    id: 8,
    name: "Outras Manutenções",
    iconUrl: "/assets/ic_modules/ic_other_maintenance.svg",
  },
  OtherComplaints: {
    id: 14,
    name: "Outras Reclamações",
    iconUrl: "/assets/ic_modules/ic_other_complaints.svg",
  },
  NoisePollution: {
    id: 13,
    name: "Poluição Sonora",
    iconUrl: "/assets/ic_modules/ic_noise_pollution.svg",
  },
  VariousComplaints: {
    id: 11,
    name: "Reclamações Diversas",
    iconUrl: "/assets/ic_modules/ic_various_complaints.svg",
  },
  BasicSanitation: {
    id: 10,
    name: "Saneamento Básico",
    iconUrl: "/assets/ic_modules/ic_basic_sanitation.svg",
  },
  PublicSecurity: {
    id: 2,
    name: "Segurança Pública",
    iconUrl: "/assets/ic_modules/ic_public_security.svg",
  },
  ConsumerUnit: {
    id: 16,
    name: "Unidade Consumidora",
    iconUrl: "/assets/ic_modules/ic_consumer_unit.svg",
  },
} as const;

export const modules: Module[] = Object.values(ModuleType);


export function getAvailableModules(availableIds: number[]): Module[] {
  return modules.filter(module => availableIds.includes(module.id));
}

export function getModuleById(id: number): Module  {
  const module = modules.find(module => module.id === id);
  if (!module) {
    throw new Error(`Module with id ${id} not found`);
  }
  return module;
}
