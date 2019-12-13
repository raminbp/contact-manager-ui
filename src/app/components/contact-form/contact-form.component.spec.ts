import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactFormComponent} from './contact-form.component';
import {MatDialogModule, MatDialogRef, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when fields are empty', () => {
    const {contactForm: form, contactForm: {controls}} = component;
    controls.name.setValue('');
    controls.email.setValue('');
    controls.phone.setValue('');
    expect(form.valid).toBeFalsy();
  });

  it('should be invalid given the wrong format \'email\'', () => {
    const {contactForm: form, contactForm: {controls}} = component;
    controls.name.setValue('jane doe');
    controls.email.setValue('fake_email');
    controls.phone.setValue('+98 1234567898');
    expect(form.valid).toBeFalsy();
  });

  it('should be invalid given the wrong format \'phone\'', () => {
    const {contactForm: form, contactForm: {controls}} = component;
    controls.name.setValue('jane doe');
    controls.email.setValue('example@mail.com');
    controls.phone.setValue('+98 12');
    expect(form.valid).toBeFalsy();
  });

  it('should be invalid given the wrong format \'name\'', () => {
    const {contactForm: form, contactForm: {controls}} = component;
    controls.name.setValue('jane');
    controls.email.setValue('example@mail.com');
    controls.phone.setValue('+98 1234567898');
    expect(form.valid).toBeFalsy();
  });

  it('should be valid when all fields are valid', () => {
    const {contactForm: form, contactForm: {controls}} = component;
    controls.name.setValue('jane doe');
    controls.email.setValue('example@mail.com');
    controls.phone.setValue('+98 12234567898');
    expect(form.valid).toBeFalsy();
  });
});
