import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-input-with-button',
  templateUrl: './input-with-button.component.html',
  styleUrls: ['./input-with-button.component.scss']
})
export class InputWithButtonComponent {

  @Output() onButtonClick = new EventEmitter<string>();

  public year: string = "";

  constructor() {
  }

  handleClick() {
    this.onButtonClick.emit(this.year);
  }
}
