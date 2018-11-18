import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-success', 'center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  info(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-info', 'center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  warning(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-warning', 'center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-danger', 'center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

}
