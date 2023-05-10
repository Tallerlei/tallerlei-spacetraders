import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-ship-dialog',
  templateUrl: './select-ship-dialog.component.html',
  styleUrls: ['./select-ship-dialog.component.scss']
})
export class SelectShipDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SelectShipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
