import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-input',
  template: `
    <div [formGroup]="group" [ngClass]="{ fieldError, focus }">
      <label *ngIf="label" [for]="name">
        {{ label }}<span *ngIf="required">&thinsp;*</span>
      </label>
      <span #icon data-icon [ngClass]="{ hasIcon }">
        <ng-content select="[icon-slot]"></ng-content>
      </span>
      <input
        *ngIf="type==='number'"
        [id]="name"
        [name]="name"
        [formControlName]="name"
        [type]="type"
        [value]="defaultValue"
        [min]="min"
        [max]="max"
        [step]="step"
        [autocomplete]="autoComplete(type)"
        (input)="input($event)"
        spellcheck="false"
      />
      <input
        *ngIf="type!=='number'"
        [id]="name"
        [name]="name"
        [formControlName]="name"
        [type]="showHidePassword ? 'text' : type"
        [value]="defaultValue"
        [placeholder]="placeholder"
        [autocomplete]="autoComplete(type)"
        (input)="input($event)"
        spellcheck="false"
      />
      <span *ngIf="viewPassword" (click)="showHidePassword=!showHidePassword" data-icon class="view-password">
         <svg *ngIf="!showHidePassword" focusable="false" width="20" height="20" viewBox="0 0 20 20">
           <path d="M3.26 11.6A6.97 6.97 0 0110 6c3.2 0 6.06 2.33 6.74 5.6a.5.5 0 00.98-.2A7.97 7.97 0 0010 5a7.97 7.97 0 00-7.72 6.4.5.5 0 00.98.2z" fill="#c2c2c2"/>
           <path d="M10 8a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-2.5 3.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" fill="#c2c2c2"/>
         </svg>

         <svg *ngIf="showHidePassword" focusable="false" width="20" height="20" viewBox="0 0 20 20">
           <path d="M2.85 2.15a.5.5 0 10-.7.7l3.5 3.5a8.1 8.1 0 00-3.37 5.05.5.5 0 10.98.2 7.09 7.09 0 013.1-4.53l1.6 1.59a3.5 3.5 0 104.88 4.89l4.3 4.3a.5.5 0 00.71-.7l-15-15zm9.27 10.68a2.5 2.5 0 11-3.45-3.45l3.45 3.45z" fill="#c2c2c2"></path><path d="M10.12 8l3.38 3.38A3.5 3.5 0 0010.12 8z"/>
           <path d="M10 6c-.57 0-1.13.07-1.67.21l-.8-.8A7.65 7.65 0 0110 5c3.7 0 6.94 2.67 7.72 6.4a.5.5 0 01-.98.2A6.97 6.97 0 0010 6z" fill="#c2c2c2"/>
         </svg>
      </span>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      width: 100%;
      max-width: 300px;
    }

    * {
      box-sizing: border-box;
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

      [data-icon] {
        display: inline-flex;
        flex-shrink: 0;

        &.hasIcon {
          margin-right: 4px;
        }

        &.view-password {
          margin: 0 4px;
          cursor: pointer;
        }
      }

      input {
        padding: 8px 2px;
        border: 0;
        display: flex;
        flex-grow: 1;
        outline: none;
        color: #333;
        background-color: inherit;

        &::placeholder {
          font-weight: normal;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
        }

        &::-ms-reveal,
        &::-ms-clear {
          display: none;
        }

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
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
  @Input() placeholder?: string = "";
  @Input() controls?: FormControl;
  @Input() required?: boolean = true;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;

  @Output() modelEvent = new EventEmitter<any>();

  @ViewChild('icon', { static: true }) iconEl?: ElementRef;

  value: string | number | any;
  focus: boolean = false;
  hasIcon: boolean = false;
  viewPassword: boolean = false;
  showHidePassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.hasIcon = ((this.iconEl ?? ({}))?.nativeElement?.innerHTML ?? '').trim() !== '';
  }

  ngAfterContentInit(): void { }

  ngAfterViewInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = changes?.defaultValue?.currentValue;
    this.viewPassword = changes?.type?.currentValue === 'password';
  }

  input(event: Event) {
    this.value = (event.target as any).value;
    this.modelEvent.emit(this.value);
  }

  get fieldError(): boolean {
    const f = (this.controls as any)[this.name] ?? ({});
    return f.status === 'INVALID' && f.touched && this.required;
  }

  autoComplete(type: string): string {
    let complete = '';
    switch (type) {
      case 'password':
        complete = 'new-password';
        break;
      case 'text':
        complete = 'on';
        break;
      case 'email':
        complete = 'on';
        break;
      default:
        complete = 'off';
        break;
    }
    return complete;
  };

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
