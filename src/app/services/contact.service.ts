import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Contact} from '../contact';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  URL = 'http://localhost:4000/contacts';

  constructor(private httpClient: HttpClient) {
  }

  public fetchContacts(search?: string): Observable<Contact[]> {
    const params: HttpParams = new HttpParams().set('search', search || '');
    return this.httpClient.get<Contact[]>(this.URL, {params} ).pipe(data => data);
  }

  public removeContact(id: string): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${this.URL}/${id}`).pipe(data => data);
  }

  public saveContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.URL, contact).pipe(data => data);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.URL, contact).pipe(data => data);
  }

}
