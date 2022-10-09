import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'base-button',
  template: `
    <button
      [title]="text"
      [type]="type"
      [ngClass]="{ loading }" tabindex="0"
    >
      <span data-icon #icon [ngClass]="{ hasIcon, loading }">
        <ng-content select="[icon-slot]"></ng-content>
      </span>
      <span data-text *ngIf="!loading">{{ text }}</span>
      <span data-loader *ngIf="loading">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  `,
  styles: [
    `
    * {
     box-sizing: border-box;
    }

    @keyframes sing {
      0% {
        transform: scale(1);
      }
      20% {
        transform: scale(1,2.2);
      }
      40% {
        transform: scale(1);
      }
    }

    :host {
      max-width: 200px;
      min-width: 140px;
    }

    button {
      all: unset;
      border-radius: 4px;
      border: 1px solid #eee;
      background-color: #fafafa;
      padding: 12px;
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      overflow: hidden;
      user-select: none;
      will-change: opacity, cursor, pointer-events, transform, box-shadow, padding;

      &.loading {
        cursor: none;
        pointer-events: none;
        opacity: 0.8;
        padding: 16px;
      }

      &:hover {
        transform: translateY(1px);
        box-shadow: 0 4px 17px rgba(0, 0, 0, 0.09);
      }

      &:active {
        transform: none;
        box-shadow: none;
      }

      span {
        display: inline-flex;
        flex-shrink: 0;

        &[data-icon] {
          &.hasIcon {
            margin-right: 8px;
          }

          &.loading {
            display: none;
          }
        }

        &[data-text] {
          line-height: 24px;
          font-size: 16px;
        }

        &[data-loader] {
          height: 4px;
          font-size: 1.5rem;
          line-height: 0;
          text-indent: 2px;
          color: rgba(68,68,68,.3);

          span {
            transform: translateZ(0);
            position: relative;
            animation: sing 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            will-change: transform;

            &::before {
              content: "\\2022";
            }

            &:nth-child(1) {
              animation-delay: 0s;
            }

            &:nth-child(2) {
              animation-delay: 0.09s;
            }

            &:nth-child(3) {
              animation-delay: .18s;
            }
          }
        }
      }
    }
    `
  ]
})
export class BaseButtonComponent implements OnInit {

  @Input() text?: string = 'Valider';
  @Input() loading?: boolean = false;
  @Input() type?: string = 'button';
  @ViewChild('icon', { static: true }) iconEl?: ElementRef;

  hasIcon: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.hasIcon = ((this.iconEl ?? ({}))?.nativeElement?.innerHTML ?? '').trim() !== '';
  }

  ngAfterViewInit (): void { }

  ngAfterContentInit(): void { }

}
