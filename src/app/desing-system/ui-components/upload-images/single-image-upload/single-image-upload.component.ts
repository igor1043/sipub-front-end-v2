import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

interface ImagePreview {
  url: string;
  file: File;
}

@Component({
  selector: 'app-single-image-upload',
  templateUrl: './single-image-upload.component.html',
  styleUrls: ['./single-image-upload.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent]
})
export class SingleImageUploadComponent implements ControlValueAccessor {
  @Input() maxFileSize: number = 5; // MB
  @Input() acceptedFormats: string[] = ['image/jpeg', 'image/png'];

  preview: ImagePreview | null = null;
  errorMessage: string | null = null;
  isDragging = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor
  writeValue(value: File | null): void {
    if (value) {
      this.processFile(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Eventos de drag and drop
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
      this.handleFile(files[0]);
    }
  }

  // Manipulador do input de arquivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
      input.value = ''; // Reseta o input
    }
  }

  // Validação e processamento do arquivo
  private handleFile(file: File): void {
    if (!this.acceptedFormats.includes(file.type)) {
      this.errorMessage = 'Formato inválido';
      return;
    }
    if (file.size > this.maxFileSize * 1024 * 1024) {
      this.errorMessage = 'Arquivo excede o tamanho máximo';
      return;
    }
    this.processFile(file);
  }

  private async processFile(file: File): Promise<void> {
    this.preview = await this.createPreview(file);
    this.emitValue();
    this.errorMessage = null;
  }

  private createPreview(file: File): Promise<ImagePreview> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) =>
        resolve({
          url: e.target?.result as string,
          file: file
        });
      reader.readAsDataURL(file);
    });
  }

  // Remove a imagem carregada
  removeImage(): void {
    this.preview = null;
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange(this.preview ? this.preview.file : null);
    this.onTouched();
  }

  // Helper para formatar o tamanho do arquivo
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}