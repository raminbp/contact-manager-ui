import {Component, Inject, Optional, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Contact} from '../../contact';
import {Action} from '../../action.enum';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]{2,} [a-zA-Z]{2,}$')
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\+[0-9]{1,2} [0-9]{10}$')
    ])
  });

  action: string;
  formData: Contact;

  constructor(
    public contactFormComponentMatDialogRef: MatDialogRef<ContactFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formData = {...data};
    this.action = data ? data.action : undefined;
  }

  ngOnInit() {
  }

  /**
   *
   */
  closeForm() {
    this.contactFormComponentMatDialogRef.close({event: 'CANCEL'});
  }

  /**
   * validate the form and dispatch events based on the form action
   */
  doAction() {
    const action: Action = Action[this.action];
    if (this.isFormValid(this.contactForm) || this.isDeleteAction(action)) {
      this.contactFormComponentMatDialogRef.close({event: action, data: this.formData});
    } else {
      this.validateFormAllFields(this.contactForm);
    }
  }

  isDeleteAction(action: Action) {
    return action === Action.DELETE;
  }

  isFormValid(form: FormGroup) {
    return this.contactForm.valid;
  }

  /**
   * validate fields of the form argument by calling markAsTouched on all fields
   */
  validateFormAllFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      form.get(field).markAsTouched({onlySelf: true});
    });
  }

  get email(): any {
    return this.contactForm.get('email');
  }

  /**
   * phone accessor
   */
  get phone(): any {
    return this.contactForm.get('phone');
  }

  /**
   * name accessor
   */
  get name(): any {
    return this.contactForm.get('name');
  }
}
