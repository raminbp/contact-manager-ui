import {Component, EventEmitter, NgModule, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss']
})

export class ContactSearchComponent implements OnInit, OnDestroy {

  private subject: Subject<string> = new Subject();

  @Output() setValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.setSearchSubscription();
  }

  ngOnInit() {
  }

  public onKeyUp(searchText: string) {
    this.subject.next(searchText);
  }

  private setSearchSubscription() {
    this.subject
      .pipe(debounceTime(500))
      .subscribe((searchText: string) => {
        this.setValue.emit(searchText);
      });
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

}
