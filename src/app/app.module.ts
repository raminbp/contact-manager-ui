import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatToolbarModule
} from '@angular/material';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {NotificationService} from './services/notification.service';
import {ContactSearchComponent} from './components/contact-search/contact-search.component';
import {ErrorService} from './services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  entryComponents: [
    ContactFormComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
      deps: [NotificationService]
    },
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
