import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TextComponent } from "../../../../../../desing-system/ui-components/text/text.component";
import { ButtonComponent } from "../../../../../../desing-system/ui-components/button/button.component";

interface ConsumerUnitDetail {
  id: number;
  account: number;
  name: string;
  class: string;
  cnpjCpf: string;
  address: string;
  bairro: string;
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
  imports: [CommonModule, TextComponent, ButtonComponent],
  templateUrl: './consumer-unit-detail.component.html',
  styleUrls: ['./consumer-unit-detail.component.css']
})
export class ConsumerUnitDetailComponent implements OnInit {
  @Input() unitId!: number;
  @Input() accountId!: number;

  consumerUnit: ConsumerUnitDetail | null = null;

  showFullscreen = false;

  ngOnInit(): void {
    this.loadConsumerUnitData();
  }

  private loadConsumerUnitData(): void {
    const now = new Date();
    this.consumerUnit = {
      id: 1,
      account: 2,
      name: `Unidade Escola da mata`,
      class: `Industrial`,
      cnpjCpf: '139.020.296.84',
      address: 'Rua X',
      bairro: 'Centro',
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
