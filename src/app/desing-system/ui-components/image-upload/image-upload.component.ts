import { Component, Input, forwardRef, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

interface ImagePreview {
  url: string;
  file: File;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Input() maxFiles: number = 0; // 0 = ilimitado
  @Input() maxFileSize: number = 5; // MB
  @Input() acceptedFormats: string[] = ['image/jpeg', 'image/png', 'image/gif'];

  previews: ImagePreview[] = [];
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
  writeValue(value: File[] | null): void {
    if (value && value.length > 0) {
      this.processFiles(value);
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
    
    // Validate max files
    if (this.maxFiles > 0 && (this.previews.length + fileArray.length) > this.maxFiles) {
      this.errorMessage = `Máximo de ${this.maxFiles} imagem${this.maxFiles > 1 ? 's' : ''} permitida${this.maxFiles > 1 ? 's' : ''}`;
      return;
    }

    // Filter and process valid files
    const validFiles = fileArray.filter(file => 
      this.acceptedFormats.includes(file.type) && 
      file.size <= this.maxFileSize * 1024 * 1024
    );

    if (validFiles.length !== fileArray.length) {
      this.errorMessage = 'Alguns arquivos foram ignorados (formato ou tamanho inválido)';
    }

    this.processFiles(validFiles);
  }

  private async processFiles(files: File[]): Promise<void> {
    for (const file of files) {
      const preview = await this.createPreview(file);
      this.previews.push(preview);
    }
    
    if (this.maxFiles === 1 && this.previews.length > 1) {
      this.previews = [this.previews[this.previews.length - 1]];
    }
    
    this.emitValue();
    this.errorMessage = null;
  }

  private createPreview(file: File): Promise<ImagePreview> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({
        url: e.target?.result as string,
        file: file
      });
      reader.readAsDataURL(file);
    });
  }

  // Remove image
  removeImage(preview: ImagePreview): void {
    this.previews = this.previews.filter(p => p !== preview);
    this.emitValue();
  }

  // Helpers
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private emitValue(): void {
    const files = this.previews.map(preview => preview.file);
    this.onChange(this.maxFiles === 1 ? files[0] || null : files);
    this.onTouched();
  }
}