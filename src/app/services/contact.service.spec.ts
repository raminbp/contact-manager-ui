import {TestBed} from '@angular/core/testing';

import {ContactService} from './contact.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {Contact} from '../contact';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Test} from 'tslint';

describe('ContactService', () => {

  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.get(ContactService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('fetchContacts', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should be able to fetch contacts via GET', () => {
      const contacts: Contact[] = [
        {
          _id: '1',
          name: 'jane doe',
          email: 'jane@gmail.com',
          phone: '+98 1234567899'
        }, {
          _id: '2',
          name: 'john doe',
          email: 'john@gmail.com',
          phone: '+98 1234567898'
        }
      ];

      service.fetchContacts().subscribe(data => {
        expect(data.length).toBe(2);
        expect(data).toEqual(contacts);
      });

      const request = httpMock.expectOne(`${service.URL}?search=`);
      expect(request.request.method).toBe('GET');
      request.flush(contacts);
    });

    it('should be able to fetch contacts via GET using a search criteria over \'name\' and \'email\' fields', () => {
      const contacts: Contact[] = [
        {
          _id: '1',
          name: 'jane doe',
          email: 'jane@gmail.com',
          phone: '+98 1234567899'
        }
      ];

      service.fetchContacts('doe').subscribe(data => {
        expect(data.length).toBe(1);
        expect(data).toEqual(contacts);
      });

      const request = httpMock.expectOne(`${service.URL}?search=doe`);
      expect(request.request.method).toBe('GET');
      request.flush(contacts);
    });

  });

  describe('saveContact', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should be able to save a phantom contact via POST', () => {
      const phantomContact: Contact = {
        _id: null,
        name: 'jane doe',
        email: 'jane@gmail.com',
        phone: '+98 1234567899'
      };
      const expectedContact: Contact = {
        _id: '123',
        name: 'jane doe',
        email: 'jane@gmail.com',
        phone: '+98 1234567899'
      };

      service.saveContact(phantomContact).subscribe(data => {
        expect(data).toBe(expectedContact);
      });
      const request = httpMock.expectOne(`${service.URL}`);
      expect(request.request.method).toBe('POST');
      request.flush(expectedContact);
    });

    it('should return 500 status code given a repetitive name via POST', () => {
      const contact: Contact = {
        name: 'repetitive name',
        email: 'jame@gmail.com',
        phone: '+98 1234567896'
      };
      service.saveContact(contact).subscribe(() => {
      }, (error: HttpErrorResponse) => {
        expect(error.error).toBe('Save contact failure');
        expect(error.status).toBe(500);
      });

      const request = httpMock.expectOne(`${service.URL}`);
      expect(request.request.method).toBe('POST');
      request.flush('Save contact failure', {status: 500, statusText: 'Server Error'});
    });
  });
});
