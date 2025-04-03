export const ModuleType = {
  WaterSupply: { id: 4, name: "Abastecimento de Água" },
  TreePruning: { id: 12, name: "Corte e Poda de Árvores" },
  DebrisCollection: { id: 5, name: "Coleta de Entulho" },
  GarbageCollection: { id: 6, name: "Coleta de Lixo" },
  AnimalControl: { id: 15, name: "Controle de Animais" },
  ReportCrime: { id: 17, name: "Denunciar Crime" },
  MunicipalConsortium: { id: 3, name: "Consórcio Municipal" },
  DengueOutbreaks: { id: 9, name: "Focos de Dengue" },
  PublicLighting: { id: 1, name: "Iluminação Pública" },
  RoadMaintenance: { id: 7, name: "Manutenção de Ruas" },
  OtherMaintenance: { id: 8, name: "Outras Manutenções" },
  OtherComplaints: { id: 14, name: "Outras Reclamações" },
  NoisePollution: { id: 13, name: "Poluição Sonora" },
  VariousComplaints: { id: 11, name: "Reclamações Diversas" },
  BasicSanitation: { id: 10, name: "Saneamento Básico" },
  PublicSecurity: { id: 2, name: "Segurança Pública" },
  ConsumerUnit: { id: 16, name: "Unidade Consumidora" },
} as const;

export interface Module {
  id: number;
  name: string;
  iconUrl: string;
  isActive: boolean;
}

const baseIconPath = "/assets/ic_modules/";

export const modules: Module[] = [
  { id: ModuleType.WaterSupply.id, name: ModuleType.WaterSupply.name, iconUrl: `${baseIconPath}ic_water_supply.svg`, isActive: true },
  { id: ModuleType.TreePruning.id, name: ModuleType.TreePruning.name, iconUrl: `${baseIconPath}ic_tree_pruning.svg`, isActive: true },
  { id: ModuleType.DebrisCollection.id, name: ModuleType.DebrisCollection.name, iconUrl: `${baseIconPath}ic_debris_collection.svg`, isActive: true },
  { id: ModuleType.GarbageCollection.id, name: ModuleType.GarbageCollection.name, iconUrl: `${baseIconPath}ic_garbage_collection.svg`, isActive: true },
  { id: ModuleType.AnimalControl.id, name: ModuleType.AnimalControl.name, iconUrl: `${baseIconPath}ic_animal_control.svg`, isActive: true },
  { id: ModuleType.ReportCrime.id, name: ModuleType.ReportCrime.name, iconUrl: `${baseIconPath}ic_report_crime.svg`, isActive: true },
  { id: ModuleType.MunicipalConsortium.id, name: ModuleType.MunicipalConsortium.name, iconUrl: `${baseIconPath}ic_municipal_consortium.svg`, isActive: true },
  { id: ModuleType.DengueOutbreaks.id, name: ModuleType.DengueOutbreaks.name, iconUrl: `${baseIconPath}ic_dengue_outbreaks.svg`, isActive: true },
  { id: ModuleType.PublicLighting.id, name: ModuleType.PublicLighting.name, iconUrl: `${baseIconPath}ic_public_illumination.svg`, isActive: true },
  { id: ModuleType.RoadMaintenance.id, name: ModuleType.RoadMaintenance.name, iconUrl: `${baseIconPath}ic_road_maintenance.svg`, isActive: true },
  { id: ModuleType.OtherMaintenance.id, name: ModuleType.OtherMaintenance.name, iconUrl: `${baseIconPath}ic_other_maintenance.svg`, isActive: true },
  { id: ModuleType.OtherComplaints.id, name: ModuleType.OtherComplaints.name, iconUrl: `${baseIconPath}ic_other_complaints.svg`, isActive: true },
  { id: ModuleType.NoisePollution.id, name: ModuleType.NoisePollution.name, iconUrl: `${baseIconPath}ic_noise_pollution.svg`, isActive: true },
  { id: ModuleType.VariousComplaints.id, name: ModuleType.VariousComplaints.name, iconUrl: `${baseIconPath}ic_various_complaints.svg`, isActive: true },
  { id: ModuleType.BasicSanitation.id, name: ModuleType.BasicSanitation.name, iconUrl: `${baseIconPath}ic_basic_sanitation.svg`, isActive: true },
  { id: ModuleType.PublicSecurity.id, name: ModuleType.PublicSecurity.name, iconUrl: `${baseIconPath}ic_public_security.svg`, isActive: true },
  { id: ModuleType.ConsumerUnit.id, name: ModuleType.ConsumerUnit.name, iconUrl: `${baseIconPath}ic_consumer_unit.svg`, isActive: true },
];