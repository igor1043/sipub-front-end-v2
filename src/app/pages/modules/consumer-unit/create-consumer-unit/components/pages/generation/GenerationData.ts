export interface GenerationData {
    generatorList: GeneratorItem[];
    generationSource: number;
    selectedFeatures: string[];
  }

export interface GeneratorItem {
    id: number;
    manufacturer: string;
    model: string;
    unitPower: number;
    quantity: number;
    installedModules: number;
    totalPower: number;
    area: number;
    installedPower: number;
    generationType: string;
    status: string;
  }