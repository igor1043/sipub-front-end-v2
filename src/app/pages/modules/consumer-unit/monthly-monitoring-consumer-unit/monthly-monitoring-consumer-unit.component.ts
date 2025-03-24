import { Component } from '@angular/core';
import { PdfUploadComponent } from "../../../../desing-system/ui-components/pdf-upload/pdf-upload.component";
import { TextComponent } from "../../../../desing-system/ui-components/text/text.component";

@Component({
  selector: 'app-monthly-monitoring-consumer-unit',
  imports: [PdfUploadComponent, TextComponent],
  templateUrl: './monthly-monitoring-consumer-unit.component.html',
  styleUrl: './monthly-monitoring-consumer-unit.component.css'
})
export class MonthlyMonitoringConsumerUnitComponent {

}
