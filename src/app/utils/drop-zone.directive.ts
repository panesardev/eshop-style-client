import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[dropZone]' })
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  handleDrop($event: any): void {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  handleDragOver($event: any): void {
    $event.preventDefault();
    this.hovered.emit(true);
  }
  
  @HostListener('dragleave', ['$event'])
  handleDragLeave($event: any): void {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
