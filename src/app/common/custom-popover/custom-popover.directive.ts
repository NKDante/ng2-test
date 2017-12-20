import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCustomPopover]',
  host: {
    '(document:click)': 'onClickOutside($event)',
  }
})
export class CustomPopoverDirective implements OnInit {
  @Input("appCustomPopover") template: string = "";

  private popExists: boolean = false;
  private backupHtml: string;
  private elementId: string;
  private parentElementId: string;
  private style: string = "display: none; position: absolute; border: 1px solid #666; background-color: white; padding: 24px; top: 50px; border-radius: 5px; z-index: 1000";
  private mainElement: HTMLElement;

  constructor(private elem: ElementRef) {
    const rand = Math.random();
    this.elementId = rand + '-popover';
    this.parentElementId = rand + '-parent';
  }

  ngOnInit() {
    if (!this.elem.nativeElement.style.position) {
      this.elem.nativeElement.style.position = "relative";
    }

    this.elem.nativeElement.innerHTML += `<div id="${this.elementId}" style="${this.style}">${this.template}</div>`;
    this.elem.nativeElement.id = this.parentElementId;

    this.mainElement = document.getElementById(this.elementId);
    const left = -((this.elem.nativeElement.offsetWidth / 2) - (this.mainElement.offsetWidth / 2));
    this.mainElement.style.left = `${left}px`;

    this.backupHtml = this.elem.nativeElement.innerHTML;
  }

  onClickOutside(event: any) {
    const popFound = event.path.find((item) => item.id === this.elementId);
    const parentFound = event.path.find((item) => item.id === this.parentElementId);

    if (this.popExists) {
      if (!popFound) {
        this.mainElement.style.display = "none";
        this.popExists = false;
      }
    } else {
      if (parentFound) {
        this.mainElement.style.display = "block";
        this.popExists = true;
      }
    }
  }
}
