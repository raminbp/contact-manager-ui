import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearchComponent } from './contact-search.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ContactSearchComponent', () => {
  let component: ContactSearchComponent;
  let fixture: ComponentFixture<ContactSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSearchComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
