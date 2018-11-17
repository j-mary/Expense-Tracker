import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-success', 'text-center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  info(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-info', 'text-center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  warning(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-warning', 'text-center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['bg-danger', 'text-center'];
    config.duration = 2500;
    this.snackBar.open(message, null, config);
  }

}
