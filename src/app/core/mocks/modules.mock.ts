import { Injectable } from '@angular/core';
import { Module, modules } from '../interfaces/module.interface';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModulesMockService {
  private mockModules: Module[] = modules;

  getModulesActive() {
    const activeModules = this.mockModules.filter(module => module.isActive);
    return activeModules;
  }

  getListModulesActive() {
      const mockListModules: Module[] = this.getModulesActive();
      return of(mockListModules).pipe(delay(800));
    }
}