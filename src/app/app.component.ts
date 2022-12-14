import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneDATA } from '@lbgm/phone-input';

import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
  addSuccessListener,
} from "kkiapay";

enum FormEnum {
  INVALID = 'INVALID',
  VALID = 'VALID'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'support-angular';
  loading: boolean = false;

  form!: FormGroup;

  phone: PhoneDATA = {};
  phoneCountry: string = '';

  constructor(private reactiveForm: FormBuilder) {

  }

  pay(): void {
    openKkiapayWidget({
      amount: 1000,
      api_key: "",
      key: "",
      sandbox: false,
      phone: "97000000",
      data: JSON.stringify({
        amount: 1000,
        product: 'velo'
      }),
    })
  }

  test(data: any): void{
    console.log("payment success...", { data });
  }

  successHandler(data : any): void {
    this.test(data);
  }

  ngOnInit() {
    (window as any).approot = this;
    addSuccessListener(this.successHandler.bind(this) as any)

    // build reactive form control
    this.form = this.reactiveForm.group({
      email: [
        'ayémi',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.email
        ]
      ],

      vehicle: [
        '',
        [
          Validators.required,
        ]
      ],

      motorcycle: [
        '',
        [
          Validators.required
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
        ]
      ]
    })
  }

  ngOnDestroy(){
    //removeKkiapayListener('success',this.successHandler)
  }

  get formControl (): FormControl {
    return this.form?.controls as unknown as FormControl;
  }

  onSubmit() {
    if(this.form.status === FormEnum.INVALID) {
      return this.form.markAllAsTouched();
    }

    this.loading = true;
  }


}
