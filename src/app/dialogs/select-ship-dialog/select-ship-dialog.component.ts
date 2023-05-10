import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Ship } from 'src/app/shared/models/ship/ship';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';

@Component({
  selector: 'app-select-ship-dialog',
  templateUrl: './select-ship-dialog.component.html',
  styleUrls: ['./select-ship-dialog.component.scss']
})
export class SelectShipDialogComponent {
  ships: WritableSignal<Ship[]> = signal([]);
  selectedShip: Ship = new Ship();

  constructor(
    public dialogRef: MatDialogRef<SelectShipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Waypoint },
    private api: SpacetradersApiService
  ) {
    this.api.myShips().subscribe({ next: (ships) => this.ships.set(ships) });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
