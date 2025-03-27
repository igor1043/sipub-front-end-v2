import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportSubItem } from '../report-list/report.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DynamicFormComponent {
  @Input() subItem!: ReportSubItem;
  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    this.createForm();
  }

  private createForm() {
    const group: any = {};
    this.subItem.formConfig.forEach(field => {
      group[field.key] = [field.defaultValue || ''];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados do relatório:', this.form.value);
    }
  }
}