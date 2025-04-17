import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'app/core/services/account/account.service';
import { NotificationService } from 'app/desing-system/ui-components/notification/NotificationService';
import { LampCountResponse } from 'app/core/services/account/models/account.count';

@Component({
  selector: 'app-public-illumination-count',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './public-illumination-count.component.html',
  styleUrls: ['./public-illumination-count.component.css']
})
export class PublicIlluminationCountComponent implements OnInit {

  @Input() accountId: number | null = null;


  title = 'Pontos Luminosos';
  municipalPoints = 0;
  concessionairePoints = 0;
  icon = 'lightbulb';

  private accountService = inject(AccountService);
  private notificationService = inject(NotificationService);

  async ngOnInit(): Promise<void> {
    if (this.accountId !== null) {
      console.log("fiz aqui", this.accountId)
      await this.loadLampCount(this.accountId);
    } else {

    }
  }

  async loadLampCount(accountId: number): Promise<void> {
    try {
      const response: LampCountResponse = await firstValueFrom(
        this.accountService.getLampCountByAccount(accountId)
      );
      this.municipalPoints = response.data.city_hall_quantity;
      this.concessionairePoints = response.data.dealership_quantity;
    } catch (error) {
      console.error('Erro ao carregar contagem de lâmpadas:', error);
    }
  }
}
