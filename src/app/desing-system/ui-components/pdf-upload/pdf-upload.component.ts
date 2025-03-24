import { Component, Input, forwardRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent]
})
export class PdfUploadComponent implements ControlValueAccessor {
  @Input() maxFiles: number = 0; // 0 = ilimitado
  @Input() maxFileSize: number = 5; // MB
  @Input() allowMultiple: boolean = true;

  files: File[] = [];
  isDragging = false;
  errorMessage: string | null = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor methods
  writeValue(value: File[] | File | null): void {
    if (value) {
      this.files = Array.isArray(value) ? value : [value];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Drag and drop handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  // File input handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(input.files);
      input.value = ''; // Reset input
    }
  }

  // Common file handling
  private handleFiles(files: FileList): void {
    const fileArray = Array.from(files);
    
    // Reset error message
    this.errorMessage = null;

    // Validação de quantidade máxima
    if (this.maxFiles > 0 && (this.files.length + fileArray.length) > this.maxFiles) {
        this.errorMessage = `Máximo de ${this.maxFiles} arquivo${this.maxFiles > 1 ? 's' : ''} permitido${this.maxFiles > 1 ? 's' : ''}`;
        return;
    }

    // Processar cada arquivo
    const validFiles: File[] = [];
    for (const file of fileArray) {
        // Validar tipo
        if (file.type !== 'application/pdf') {
            this.errorMessage = 'Formato não suportado. Apenas PDFs são permitidos.';
            continue;
        }

        // Validar tamanho
        if (file.size > this.maxFileSize * 1024 * 1024) {
            this.errorMessage = `Arquivo excede o tamanho máximo de ${this.maxFileSize}MB`;
            continue;
        }

        validFiles.push(file);
    }

    // Adicionar arquivos válidos
    if (validFiles.length > 0) {
        this.files = this.maxFiles === 1 ? 
            [validFiles[0]] : 
            [...this.files, ...validFiles].slice(0, this.maxFiles);
        this.emitValue();
    }
}

  // Remove file
  removeFile(file: File): void {
    this.files = this.files.filter(f => f !== file);
    this.emitValue();
  }

  // Helpers
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]);
  }

  private emitValue(): void {
    if (this.maxFiles === 1) {
      this.onChange(this.files[0] || null);
    } else {
      this.onChange(this.files);
    }
    this.onTouched();
  }
}