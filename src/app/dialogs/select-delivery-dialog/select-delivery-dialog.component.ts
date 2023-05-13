import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Ship } from 'src/app/shared/models/ship/ship';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';

@Component({
  selector: 'app-select-delivery-dialog',
  templateUrl: './select-delivery-dialog.component.html',
  styleUrls: ['./select-delivery-dialog.component.scss']
})
export class SelectDeliveryDialogComponent {
  ships: WritableSignal<Ship[]> = signal([]);
  selectedShip: Ship = new Ship();

  constructor(
    public dialogRef: MatDialogRef<SelectDeliveryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Waypoint },
    private api: SpacetradersApiService
  ) {
    this.api.myShips().subscribe({ next: (ships) => this.ships.set(ships) });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
