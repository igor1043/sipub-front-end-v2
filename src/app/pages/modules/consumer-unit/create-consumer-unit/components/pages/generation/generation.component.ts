import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from "../../../../../../../desing-system/ui-components/text/text.component";
import { InputTextComponent } from "../../../../../../../desing-system/ui-components/inputs/input-text/input-text.component";
import { DropdownComponent } from "../../../../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ButtonComponent } from "../../../../../../../desing-system/ui-components/button/button.component";
import { SimpleTableComponent } from "../../../../../../../desing-system/ui-components/tables/simple-table/simple-table.component";
import { RadioItemComponent } from "../../../../../../../desing-system/ui-components/radio-item/radio-item.component";
import { CheckboxItemComponent } from "../../../../../../../desing-system/ui-components/checkbox-item/checkbox-item.component";
import { RadioGroupComponent } from "../../../../../../../desing-system/ui-components/radio-group/radio-group.component";

interface DropdownOption {
  id: number;
  name: string;
  type: string;
}

interface Generator {
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

@Component({
  selector: 'app-generation',
  standalone: true,
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TextComponent,
    InputTextComponent,
    DropdownComponent,
    ButtonComponent,
    SimpleTableComponent,
    RadioItemComponent,
    CheckboxItemComponent,
    RadioGroupComponent
]
})
export class GenerationComponent implements OnInit {
  generationForm: FormGroup;
  isEditing = false;
  currentEditId: number | null = null;

  @Input() initialGeneratorList: Generator[] = [];
  @Output() generatorListChanged = new EventEmitter<Generator[]>();

  generatorList: Generator[] = [];
  solicitationItems: string[] = [];
  myValue: boolean = false

  nextId = 1;
  unavailableMessage = 'Esta funcionalidade não está disponível para o tipo de geração selecionado.';



  tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'manufacturer', header: 'Fabricante' },
    { key: 'model', header: 'Modelo' },
    { key: 'unitPower', header: 'Potência Unitária (KWp)' },
    { key: 'quantity', header: 'Quantidade' },
    { key: 'totalPower', header: 'Potência Total (KW)' },
    { key: 'installedPower', header: 'Potência Instalada (kW)' },
    { key: 'generationType', header: 'Tipo de Geração' },
    {
      key: 'status',
      header: 'Status',
      cellClass: (element: Generator) => {
        return element.status === 'Ativo'
          ? 'status-badge status-active'
          : 'status-badge status-inactive'
      }
    },
  ];

  pageSize = 5;
  currentPage = 0;

  manufacturerOptions: DropdownOption[] = [
    { id: 1, name: 'Fabricante A', type: 'manufacturer' },
    { id: 2, name: 'Fabricante B', type: 'manufacturer' },
    { id: 3, name: 'Fabricante C', type: 'manufacturer' },
    { id: 4, name: 'Fabricante D', type: 'manufacturer' }
  ];

  modelOptions: DropdownOption[] = [
    { id: 1, name: 'Modelo X', type: 'model' },
    { id: 2, name: 'Modelo Y', type: 'model' },
    { id: 3, name: 'Modelo Z', type: 'model' }
  ];

  generationTypeOptions: DropdownOption[] = [
    { id: 1, name: 'Microgeração <= 10 KW', type: 'generationType' },
    { id: 2, name: 'Minigeração > 10 KW e <= 75 KW', type: 'generationType' },
    { id: 3, name: 'Geração Distribuída > 75 KW', type: 'generationType' }
  ];

  statusOptions: DropdownOption[] = [
    { id: 1, name: 'Ativo', type: 'status' },
    { id: 2, name: 'Inativo', type: 'status' }
  ];

  generationSourceOptions = [
    { value: 1, label: 'Solar' },
    { value: 2, label: 'Hidráulica' },
    { value: 3, label: 'Eólica' },
    { value: 4, label: 'Biomassa' },
    { value: 5, label: 'Cogeração Qualificada' }
  ];

  constructor(private fb: FormBuilder) {
    this.generationForm = this.fb.group({
      generationSource: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      unitPower: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      installedModules: ['', [Validators.required, Validators.min(1)]],
      totalPower: [{ value: '', disabled: true }],
      area: ['', [Validators.required, Validators.min(0)]],
      installedPower: [{ value: '', disabled: true }],
      generationType: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.generatorList = this.initialGeneratorList ? [...this.initialGeneratorList] : [];

    if (this.generatorList.length > 0) {
      this.nextId = Math.max(...this.generatorList.map(g => g.id)) + 1;
    }

    this.generationForm.valueChanges.subscribe(() => {
      this.generatorListChanged.emit(this.generatorList);
    });
  }

  addOrUpdateGenerator() {
    if (this.generationForm.valid) {
      if (this.isEditing && this.currentEditId !== null) {
        this.updateGenerator();
      } else {
        this.addGenerator();
      }
    } else {
      Object.values(this.generationForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  private addGenerator() {
    const newGenerator: Generator = {
      id: this.nextId++,
      manufacturer: this.getOptionName(this.generationForm.value.manufacturer, 'manufacturer'),
      model: this.getOptionName(this.generationForm.value.model, 'model'),
      unitPower: parseFloat(this.generationForm.value.unitPower),
      quantity: parseFloat(this.generationForm.value.quantity),
      installedModules: parseFloat(this.generationForm.value.installedModules),
      totalPower: parseFloat(this.generationForm.get('totalPower')?.value),
      area: parseFloat(this.generationForm.value.area),
      installedPower: parseFloat(this.generationForm.get('installedPower')?.value),
      generationType: this.getOptionName(this.generationForm.value.generationType, 'generationType'),
      status: this.getOptionName(this.generationForm.value.status, 'status')
    };

    this.generatorList = [...this.generatorList, newGenerator];
    this.resetForm();
    this.generatorListChanged.emit(this.generatorList);
  }



  private updateGenerator() {
    const updatedGenerator: Generator = {
      id: this.currentEditId!,
      manufacturer: this.getOptionName(this.generationForm.value.manufacturer, 'manufacturer'),
      model: this.getOptionName(this.generationForm.value.model, 'model'),
      unitPower: parseFloat(this.generationForm.value.unitPower),
      quantity: parseFloat(this.generationForm.value.quantity),
      installedModules: parseFloat(this.generationForm.value.installedModules),
      totalPower: parseFloat(this.generationForm.get('totalPower')?.value),
      area: parseFloat(this.generationForm.value.area),
      installedPower: parseFloat(this.generationForm.get('installedPower')?.value),
      generationType: this.getOptionName(this.generationForm.value.generationType, 'generationType'),
      status: this.getOptionName(this.generationForm.value.status, 'status')
    };

    const index = this.generatorList.findIndex(g => g.id === this.currentEditId);
    if (index !== -1) {
      this.generatorList[index] = updatedGenerator;
      this.generatorList = [...this.generatorList];
      this.resetForm();
      this.generatorListChanged.emit(this.generatorList);
    }
  }

  private resetForm() {
    this.generationForm.get('manufacturer')?.reset();
    this.generationForm.get('model')?.reset();
    this.generationForm.get('unitPower')?.reset();
    this.generationForm.get('quantity')?.reset();
    this.generationForm.get('installedModules')?.reset();
    this.generationForm.get('totalPower')?.reset();
    this.generationForm.get('area')?.reset();
    this.generationForm.get('installedPower')?.reset();

    this.generationForm.get('generationType')?.reset();
    this.generationForm.get('status')?.reset();

    this.isEditing = false;
    this.currentEditId = null;
  }

  private getOptionName(id: number, type: string): string {
    let options: DropdownOption[] = [];

    switch (type) {
      case 'manufacturer': options = this.manufacturerOptions; break;
      case 'model': options = this.modelOptions; break;
      case 'generationType': options = this.generationTypeOptions; break;
      case 'status': options = this.statusOptions; break;
    }

    const option = options.find(opt => opt.id === id);
    return option ? option.name : '';
  }

  private findOptionIdByName(name: string, type: string): number | undefined {
    let options: DropdownOption[] = [];

    switch (type) {
      case 'manufacturer': options = this.manufacturerOptions; break;
      case 'model': options = this.modelOptions; break;
      case 'generationType': options = this.generationTypeOptions; break;
      case 'status': options = this.statusOptions; break;
    }

    const option = options.find(opt => opt.name === name);
    return option?.id;
  }

  handleAdd() {
    this.addOrUpdateGenerator();
  }

  handleEdit(generator: Generator) {
    this.isEditing = true;
    this.currentEditId = generator.id;

    this.generationForm.patchValue({
      manufacturer: this.findOptionIdByName(generator.manufacturer, 'manufacturer'),
      model: this.findOptionIdByName(generator.model, 'model'),
      unitPower: generator.unitPower,
      quantity: generator.quantity,
      installedModules: generator.installedModules,
      totalPower: generator.totalPower,
      area: generator.area,
      installedPower: generator.installedPower,
      generationType: this.findOptionIdByName(generator.generationType, 'generationType'),
      status: this.findOptionIdByName(generator.status, 'status')
    });
  }

  handleDelete(generator: Generator) {
    this.generatorList = this.generatorList.filter(g => g.id !== generator.id);
    this.generatorListChanged.emit(this.generatorList);
  }

  handleSelect(generator: Generator) {
    console.log('Selected generator:', generator);
  }

  handlePageChange(event: { page: number, pageSize: number }) {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
  }

  handleBulkDelete(items: Generator[]): void {
    const idsToDelete = items.map(item => item.id);
    this.generatorList = this.generatorList.filter(g => !idsToDelete.includes(g.id));
    this.generatorListChanged.emit(this.generatorList);
  }

  calculateTotalPower() {
    const unitPower = parseFloat(this.generationForm.get('unitPower')?.value) || 0;
    const quantity = parseFloat(this.generationForm.get('quantity')?.value) || 0;
    const totalPower = unitPower * quantity;
    this.generationForm.get('totalPower')?.setValue(totalPower.toFixed(2));
  }

  calculateInstalledPower() {
    const unitPower = parseFloat(this.generationForm.get('unitPower')?.value) || 0;
    const installedModules = parseFloat(this.generationForm.get('installedModules')?.value) || 0;
    const installedPower = unitPower * installedModules;
    this.generationForm.get('installedPower')?.setValue(installedPower.toFixed(2));
  }

  get isSolar(): boolean {
    return this.generationForm.get('generationSource')?.value === 1;
  }
}