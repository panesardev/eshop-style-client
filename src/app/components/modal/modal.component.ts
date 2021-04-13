import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() output = new EventEmitter<boolean>();

  show: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
