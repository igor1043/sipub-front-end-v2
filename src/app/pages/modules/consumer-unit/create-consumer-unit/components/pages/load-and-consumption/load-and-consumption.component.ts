import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TextComponent } from "../../../../../../../desing-system/ui-components/text/text.component";
import { InputTextComponent } from "../../../../../../../desing-system/ui-components/inputs/input-text/input-text.component";
import { DropdownComponent } from "../../../../../../../desing-system/ui-components/inputs/dropdown/dropdown.component";
import { ButtonComponent } from "../../../../../../../desing-system/ui-components/button/button.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleTableComponent } from "../../../../../../../desing-system/ui-components/tables/simple-table/simple-table.component";
import { Equipment } from './list-equipment-interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface DropdownOption {
  id: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-load-and-consumption',
  standalone: true,
  templateUrl: './load-and-consumption.component.html',
  styleUrls: ['./load-and-consumption.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TextComponent,
    InputTextComponent,
    DropdownComponent,
    ButtonComponent,
    SimpleTableComponent]
})
export class LoadAndConsumptionComponent implements OnInit {
  equipmentForm: FormGroup;
  isEditing = false;
  currentEditId: number | null = null;

  @Input() initialEquipmentList: Equipment[] = []; 
  @Output() equipmentListChanged = new EventEmitter<Equipment[]>();

  equipmentList: Equipment[] = [];
  nextId = 1;

  tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'equipmentName', header: 'Nome do Equipamento' },
    { key: 'patrimonyNumber', header: 'Número do Patrimônio' },
    { key: 'load', header: 'Carga (W)' },
    { key: 'power', header: 'Potência (kWh)' },
    { key: 'voltage', header: 'Tensão' },
    { key: 'lifetime', header: 'Vida Útil (anos)' },
    { key: 'phase', header: 'Fase' },
    {
      key: 'status',
      header: 'Status',
      cellClass: (element: Equipment) => {
        return element.status === 'Ativo'
          ? 'status-badge status-active'
          : 'status-badge status-inactive' 
      }
    },
];

  pageSize = 5;
  currentPage = 0;

  dropdownOptions: DropdownOption[] = [
    // Voltage options
    { id: 1, name: '110V', type: 'voltage' },
    { id: 2, name: '220V', type: 'voltage' },
    { id: 3, name: '380V', type: 'voltage' },

    // Phase options
    { id: 4, name: 'Single', type: 'phase' },
    { id: 5, name: 'Three', type: 'phase' },

    // Status options
    { id: 6, name: 'Ativo', type: 'status' },
    { id: 7, name: 'Inativo', type: 'status' }
  ];

  get voltageOptions(): DropdownOption[] {
    return this.dropdownOptions.filter(option => option.type === 'voltage');
  }

  get phaseOptions(): DropdownOption[] {
    return this.dropdownOptions.filter(option => option.type === 'phase');
  }

  get statusOptions(): DropdownOption[] {
    return this.dropdownOptions.filter(option => option.type === 'status');
  }

  get isFormValid(): boolean {
    return this.equipmentForm.valid;
  }

  get buttonText(): string {
    return this.isEditing ? 'Atualizar' : 'Adicionar';
  }

  constructor(private fb: FormBuilder) {
    this.equipmentForm = this.fb.group({
      equipmentName: ['', Validators.required],
      patrimonyNumber: [''],
      load: ['', Validators.required],
      power: ['', Validators.required],
      voltage: ['', Validators.required],
      phase: ['', Validators.required],
      lifetime: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.equipmentList = this.initialEquipmentList ? [...this.initialEquipmentList] : [];
    
    if (this.equipmentList.length > 0) {
      this.nextId = Math.max(...this.equipmentList.map(e => e.id)) + 1;
    }

    this.equipmentForm.valueChanges.subscribe(() => {
      this.equipmentListChanged.emit(this.equipmentList);
    });
  }

  addOrUpdateEquipment() {
    if (this.equipmentForm.valid) {
      if (this.isEditing && this.currentEditId !== null) {
        this.updateEquipment();
      } else {
        this.addEquipment();
      }
    } else {
      Object.values(this.equipmentForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  private addEquipment() {
    const newEquipment: Equipment = {
      id: this.nextId++,
      equipmentName: this.equipmentForm.value.equipmentName,
      patrimonyNumber: this.equipmentForm.value.patrimonyNumber,
      load: parseFloat(this.equipmentForm.value.load),
      power: parseFloat(this.equipmentForm.value.power),
      voltage: this.getOptionName(this.equipmentForm.value.voltage, 'voltage'),
      lifetime: this.equipmentForm.value.lifetime,
      phase: this.getOptionName(this.equipmentForm.value.phase, 'phase'),
      status: this.getOptionName(this.equipmentForm.value.status, 'status')
    };

    this.equipmentList = [...this.equipmentList, newEquipment];
    this.resetForm();
    this.equipmentListChanged.emit(this.equipmentList);
  }

  private updateEquipment() {
    const updatedEquipment: Equipment = {
      id: this.currentEditId!,
      equipmentName: this.equipmentForm.value.equipmentName,
      patrimonyNumber: this.equipmentForm.value.patrimonyNumber,
      load: parseFloat(this.equipmentForm.value.load),
      power: parseFloat(this.equipmentForm.value.power),
      voltage: this.getOptionName(this.equipmentForm.value.voltage, 'voltage'),
      lifetime: this.equipmentForm.value.lifetime,
      phase: this.getOptionName(this.equipmentForm.value.phase, 'phase'),
      status: this.getOptionName(this.equipmentForm.value.status, 'status')
    };

    const index = this.equipmentList.findIndex(e => e.id === this.currentEditId);
    if (index !== -1) {
      this.equipmentList[index] = updatedEquipment;
      this.equipmentList = [...this.equipmentList];
      this.resetForm();
      this.equipmentListChanged.emit(this.equipmentList);
    }
  }

  private resetForm() {
    this.equipmentForm.reset();
    this.isEditing = false;
    this.currentEditId = null;
  }

  private getOptionName(id: number, type: string): string {
    const option = this.dropdownOptions.find(opt => opt.id === id && opt.type === type);
    return option ? option.name : '';
  }

  private findOptionIdByName(name: string, type: string): number | undefined {
    const option = this.dropdownOptions.find(opt => opt.name === name && opt.type === type);
    return option?.id;
  }

  handleAdd() {
    this.addOrUpdateEquipment();
  }

  handleEdit(equipment: Equipment) {
    this.isEditing = true;
    this.currentEditId = equipment.id;
    
    this.equipmentForm.patchValue({
      equipmentName: equipment.equipmentName,
      patrimonyNumber: equipment.patrimonyNumber,
      load: equipment.load,
      power: equipment.power,
      voltage: this.findOptionIdByName(equipment.voltage, 'voltage'),
      phase: this.findOptionIdByName(equipment.phase, 'phase'),
      lifetime: equipment.lifetime,
      status: this.findOptionIdByName(equipment.status, 'status')
    });
  }

  handleDelete(equipment: Equipment) {
    this.equipmentList = this.equipmentList.filter(e => e.id !== equipment.id);
    this.equipmentListChanged.emit(this.equipmentList);
  }

  handleSelect(equipment: Equipment) {
    console.log('Selected equipment:', equipment);
  }

  handlePageChange(event: { page: number, pageSize: number }) {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
  }

  handleBulkDelete(items: Equipment[]): void {
    const idsToDelete = items.map(item => item.id);
    this.equipmentList = this.equipmentList.filter(e => !idsToDelete.includes(e.id));
    this.equipmentListChanged.emit(this.equipmentList);
  }
}