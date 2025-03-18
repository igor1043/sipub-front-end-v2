import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../desing-system/ui-components/button/button.component';
import { SwitchComponent } from 'app/desing-system/ui-components/switch/switch.component';
import { TabsComponent } from 'app/desing-system/ui-components/tabs/tabs.component';

@Component({
  selector: 'app-create-consumer-unit',
  standalone: true,
  imports: [ButtonComponent, SwitchComponent,TabsComponent],
  templateUrl: './create-consumer-unit.component.html',
  styleUrl: './create-consumer-unit.component.css'
})
export class CreateConsumerUnitComponent {

  onToggle(event: any) {
    console.log(event);
  }

  onClickLogin() {

     
  }
}
