import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private environmentConfig: any;

  constructor(private http: HttpClient) {}

  loadEnvironmentConfig(): Observable<any> {
    return this.http.get('/assets/environments.json');
  }

  getConfig(): any {
    return this.environmentConfig;
  }

  setConfig(config: any): void {
    this.environmentConfig = config;
  }
}