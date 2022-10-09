import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-checkbox',
  template: `
    <span class="checkbox-ng" [formGroup]="group" [ngClass]="{ fieldError, focus }">
     <input
      [checked]="checked"
      [id]="id"
      [name]="name"
      [formControlName]="name"
      [type]="type"
      [value]="defaultValue"
      (change)="change($event)"
      ngDefaultControl
     />
     <span class="checkmark" [ngClass]="{ 'checkmark-all': all }"></span>
    </span>

    <label *ngIf="label" [for]="id" [ngClass]="{ fieldError, focus }">
     {{ label }}<span *ngIf="required">&thinsp;*</span>
    </label>
  `,
  styles: [
    ` :host {
        display: flex;
        width: fit-content;
        align-items: center;
      }

      label {
        display: inline-block;
        line-height: 12px;
        font-size: 10px;
        margin-left: 4px;
        background: #fff;
        padding: 2px;
        user-select: none;
        cursor: pointer;

        span {
          color: red;
          font-size: 12px;
        }

        &.focus {
          color: #0076a3;
        }

        &.fieldError {
          color: red;
        }


      }

      /* Customize the label (the container) */
      .checkbox-ng {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        flex-grow: 0;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        cursor: pointer;

        input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 1;
          cursor: pointer;

          &:checked ~ .checkmark {
            background-color: #1d90ed;
            border: 0;
          }

          &:checked ~ .checkmark::after {
            display: block;
          }
        }

        &.fieldError {
          .checkmark {
            border: 1px solid red;
          }
        }

        &.focus {
          .checkmark {
            border: 1px solid #0076a3;
          }
        }

        .checkmark {
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          border: 1px solid #eee;
          border-radius: 2px;
          transform: scale(0.8);

          &::after {
            position: absolute;
            display: none;
            content: '';
            top: 2px;
            left: 8px;
            width: 5px;
            height: 12px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }

          &.checkmark-all {
            &::after {
              top: 2px;
              left: 10px;
              width: 2px;
              height: 20px;
              background: white;
              transform: rotate(89deg);
            }
          }
        }
      }
    `
  ]
})
export class BaseCheckboxComponent implements OnInit {

  @Input() all?: boolean = false;
  @Input() checked?: boolean;
  @Input() group!: FormGroup;
  @Input() name!: string;
  @Input() type?: string = "checkbox";
  @Input() defaultValue?: string;
  @Input() label?: string;
  @Input() controls?: FormControl;
  @Input() required?: boolean = true;

  @Output() modelEvent = new EventEmitter<boolean | string | any>();

  id?: string;
  focus:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.id = this.name + Math.random().toString(36).substring(2, 9);
  }

  check (checked: boolean) : void {
    this.modelEvent.emit(checked ? this.defaultValue ?? checked : undefined);
  }

  change(event: Event) {
    const checked = (event.target as any).checked;
    this.check(checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.checked?.currentValue) {
      this.check(changes?.checked?.currentValue);
    }
  }

  get fieldError(): boolean {
    const f = (this.controls as any)[this.name] ?? ({});
    return f.status === 'INVALID' && f.touched && this.required;
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('mouseenter', ['$event'])
  focusOn(event: Event): void {
   switch (event.type) {
    case "mouseenter":
      this.focus = true;
    break;
    case "mouseleave":
      this.focus = false;
    break;
    default:
    break;
   }
  }

}
