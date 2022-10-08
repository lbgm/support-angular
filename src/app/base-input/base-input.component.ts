import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'base-input',
  template: `
    <div #template [formGroup]="group" [ngClass]="{fieldError, focus }">
      <label [for]="name">{{ label }}<span *ngIf="required">&thinsp;*</span></label>
      <ng-content select="[icon]"></ng-content>
      <input
        [id]="name"
        [name]="name"
        [formControlName]="name"
        [type]="type"
        [value]="defaultValue"
        (input)="input($event)"
        (mouseenter)="focus = true"
        (mouseleave)="focus = false"
      />
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      width: 100%;
      max-width: 300px;
    }

    div {
      width: 100%;
      border: 1px solid gray;
      position: relative;
      border-radius: 4px;
      padding: 2px;
      background: #fff;
      display: flex;
      align-items: center;

      &.fieldError {
        border: 1px solid red;

        label {
          color: red;
        }
      }

      &.focus {
        border: 1px solid #0076a3;

        label {
          color: #0076a3;
        }
      }

      label {
        display: block;
        line-height: 12px;
        font-size: 10px;
        position: absolute;
        left: 12px;
        transform: translateY(-18px);
        background: #fff;
        padding: 2px;
        user-select: none;

        span {
          color: red;
          font-size: 12px;
        }
      }

      input {
        padding: 8px 2px;
        border: 0;
        display: flex;
        flex-grow: 1;
        outline: none;
      }
    }`
  ]
})
export class BaseInputComponent implements OnInit {

  @ViewChild('template') template?: ElementRef;

  @Input() group!: FormGroup;
  @Input() name!: string;
  @Input() type!: string;
  @Input() defaultValue?: string;
  @Input() label?: string = "base-input works!";
  @Input() controls?: any;
  @Input() required: boolean = true;

  @Output() modelEvent: EventEmitter<any> = new EventEmitter();

  value: string | number | any;
  focus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log({
      template: this.template
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.value = changes?.defaultValue?.currentValue;
   console.log({changes});
  }

  input(event: Event) {
    this.value = (event.target as any).value;
    this.modelEvent.emit(this.value);
  }

  get fieldError(): boolean {
     const f = this.controls[this.name];
     // return Object.keys(f.errors ?? ({})).length !==0 && f.touched
     return f.status === 'INVALID' && f.touched && this.required;
  }

}
