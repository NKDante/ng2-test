import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CustomControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomAutocompleteComponent),
  multi: true
};

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.scss'],
  host: {
    '(document:click)': 'onClickOutside()',
  },
  providers: [CustomControlValueAccessor]
})
export class CustomAutocompleteComponent implements AfterViewInit, ControlValueAccessor {

  @Output() onInputChange = new EventEmitter<string>();
  @Output() onItemClick = new EventEmitter<string>();
  @Input() collection: Array<any>;
  @Input() width: string;

  private searchValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private element: ElementRef) {
  }

  @Input()
  get searchStr(): string {
    return this.searchValue;
  }

  set searchStr(value: string) {
    if (value !== this.searchValue) {
      this.searchValue = value;
      this.onChangeCallback(value);
    }
  }

  ngAfterViewInit() {
    const inputElem = this.element.nativeElement.children[0].children[0];

    const eventStream = Observable.fromEvent(inputElem, 'keyup')
      .map(() => this.searchStr)
      .debounceTime(500)
      .distinctUntilChanged();

    eventStream.subscribe(() => {
      if (this.searchStr) {
        this.onInputChange.emit(this.searchStr);
      }
    });
  }

  onClickOutside() {
    delete this.collection;
  }

  handleClick(item: any) {
    this.searchStr = item.name;
    this.onItemClick.emit(item);
  }

  removeStr() {
    this.searchStr = "";
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.searchValue) {
      this.searchValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
