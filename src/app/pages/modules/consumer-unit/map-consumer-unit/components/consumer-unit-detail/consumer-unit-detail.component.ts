import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TextComponent } from "../../../../../../desing-system/ui-components/text/text.component";
import { ButtonComponent } from "../../../../../../desing-system/ui-components/button/button.component";
import { ContainerInfoDateComponent } from "../../../../../../desing-system/components/container-info-date/container-info-date.component";
import { DividerComponent } from "../../../../../../desing-system/ui-components/divider/divider.component";

interface ConsumerUnitDetail {
  id: number;
  account: number;
  name: string;
  class: string;
  cnpjCpf: string;
  street: string;
  number: string;
  neiborhood: string;
  latitude: number;
  longitude: number;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-consumer-unit-detail',
  standalone: true,
  imports: [CommonModule, TextComponent, ButtonComponent, ContainerInfoDateComponent, DividerComponent],
  templateUrl: './consumer-unit-detail.component.html',
  styleUrls: ['./consumer-unit-detail.component.css']
})
export class ConsumerUnitDetailComponent implements OnChanges {
  @Input() unitId: string | null = null;
  @Input() accountId: number | null = null;

  consumerUnit: ConsumerUnitDetail | null = null;
  showFullscreen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['unitId'] || changes['accountId']) && this.unitId && this.accountId) {
      this.loadConsumerUnitData();
    } else {
      this.consumerUnit = null;
    }
  }

  private loadConsumerUnitData(): void {
    // Aqui você faria uma chamada real à API
    // Por enquanto, vamos simular com dados mockados
    const now = new Date();
    this.consumerUnit = {
      id: Number(this.unitId),
      account: this.accountId || 0,
      name: `Unidade ${this.unitId}`,
      class: `Industrial`,
      cnpjCpf: '139.020.296.84',
      street: 'Rua X',
      number: '45',
      neiborhood: 'Centro',
      latitude: -16.123456,
      longitude: -54.789012,
      status: 'Ativo',
      imageUrl: 'https://www.rondonopolis.mt.gov.br/media/img/blog/2021/July/188b5356-7dd7-498b-baa1-d105b1d32d36.jpeg',
      createdAt: now.toLocaleDateString(),
      updatedAt: new Date(now.getTime() - 86400000 * 2).toLocaleDateString()
    };
  }

  getStatusColor(): string {
    if (!this.consumerUnit) return '';
    return this.consumerUnit.status === 'Ativo' ? 'green' : this.consumerUnit.status === 'Inativo' ? 'red' : 'orange';
  }

  toggleImageFullscreen(): void {
    this.showFullscreen = !this.showFullscreen;
  }
}