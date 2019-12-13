import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatTable} from '@angular/material';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {Contact} from './contact';
import {Action} from './action.enum';
import {ContactService} from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cgm-angular-contact';
  dataSource: Contact[];
  columns: string[] = ['name', 'phone', 'email', 'action'];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    public contactForm: MatDialog,
    private contactService: ContactService,
  ) {
  }

  ngOnInit(): void {
    this.fetchContacts();
  }

  openContactForm(action: string, data: object) {
    const form = this.contactForm.open(ContactFormComponent, {data: {...data, action}, width: '450px'});
    form.afterClosed().subscribe(result => {
      if (result.event === Action.ADD) {
        this.addContact(result.data);
      } else if (result.event === Action.UPDATE) {
        this.updateContact(result.data);
      } else if (result.event === Action.DELETE) {
        this.removeContact(result.data);
      }
    });
  }

  fetchContacts(search?: string) {
    this.contactService.fetchContacts(search).subscribe(data => {
      this.dataSource = data;
    });
  }

  addContact(contact: Contact) {
    this.contactService.saveContact(contact).subscribe(data => {
      this.dataSource = [...this.dataSource, data];
    });
  }


  updateContact(contact: Contact) {
    const dataSource = this.dataSource;
    this.contactService.updateContact(contact).subscribe(data => {
      const index = dataSource.findIndex(item => item._id === contact._id);
      this.dataSource = [...dataSource.slice(0, index), contact, ...dataSource.slice(index + 1)];
    });
  }

  removeContact(contact: Contact) {
    const dataSource = this.dataSource;
    this.contactService.removeContact(contact._id).subscribe(data => {
      const index = dataSource.findIndex(item => item._id === contact._id);
      this.dataSource = [...dataSource.slice(0, index), ...dataSource.slice(index + 1)];
    });
  }

  filterContacts(searchText: string) {
    this.fetchContacts(searchText);
  }
}
