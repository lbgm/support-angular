import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
  addSuccessListener,
} from "kkiapay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'support-angular';
  #ngversion: string = "12.2.6";

  form!: FormGroup;

  constructor(private reactiveForm: FormBuilder) {

  }

  pay(): void {
    openKkiapayWidget({
      amount: 1000,
      api_key: /*"d950a320d20611ecb68a37334ff14a66"*/ "388d27a0aa1611ecb9755de712bc9e4f",
      key: /*"d950a320d20611ecb68a37334ff14a66"*/ "388d27a0aa1611ecb9755de712bc9e4f",
      sandbox: true,
      phone: "97000000",
      data: JSON.stringify({
        amount: 1000,
        product: 'velo'
      }),
    })
  }

  test(data: any): void{
    console.log("payment success...", {data});
  }

  successHandler(data : any): void {
    this.test(data);
  }

  ngOnInit() {
    (window as any).approot = this;
    addSuccessListener(this.successHandler.bind(this) as any)

    this.successHandler({ senou: 'igor' });

    // build reactive form control
    this.form = this.reactiveForm.group({
      ledingo: [
        'ayémi',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.email
        ]
      ],

      file: [
        null,
        [
          Validators.required
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
    if(this.form.status === 'INVALID') return alert('le formulaire est invalid !');
    this.form.patchValue({
      file: '/path/file/ertet345637376fdg353cdghd'
    })
  }


}
