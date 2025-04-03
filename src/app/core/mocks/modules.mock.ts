import { Injectable } from '@angular/core';
import { Module, modules } from '../interfaces/module.interface';

@Injectable({ providedIn: 'root' })
export class ModulesMockService {
  private mockModules: Module[] = modules;

  getModulesActive() {
    const activeModules = this.mockModules.filter(module => module.isActive);
    return activeModules;
  }
}