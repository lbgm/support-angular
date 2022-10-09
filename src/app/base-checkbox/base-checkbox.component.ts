import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-checkbox',
  template: `
    <span class="checkbox-ng" [formGroup]="group">
     <input
      type="checkbox"
      [checked]="checked"
      [id]="name"
      [name]="name"
      [formControlName]="name"
      [type]="type"
      [value]="defaultValue"
      (change)="change($event)"
     />
     <span class="checkmark" [ngClass]="{ 'checkmark-all': all }"></span>
    </span>

    <label *ngIf="label" [for]="name">
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
  @Input() required: boolean = true;

  @Output() modelEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  change(event: Event) {
    this.modelEvent.emit((event.target as any).checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.checked?.currentValue) {
      this.modelEvent.emit(changes?.checked?.currentValue);
    }
  }

}
