import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackbar: MatSnackBar) {}

  snack(message: string, args?: any) {
    this.snackbar.open(message, 'dismiss', { duration: 5000 });
  }
}
