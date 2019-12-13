import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public showSuccess(message: string) {
    this.snackBar.open(message);
  }

  public showFailure(message: string) {
    this.snackBar.open(message, 'CLOSE', {duration: 3000, panelClass: ['error']});
  }
}
