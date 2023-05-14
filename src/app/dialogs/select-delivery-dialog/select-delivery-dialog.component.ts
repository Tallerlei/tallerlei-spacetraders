import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { MyShip } from 'src/app/shared/models/ship/my-ship';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';

@Component({
  selector: 'app-select-delivery-dialog',
  templateUrl: './select-delivery-dialog.component.html',
  styleUrls: ['./select-delivery-dialog.component.scss']
})
export class SelectDeliveryDialogComponent {
  selectedShip: MyShip = new MyShip();
  selectedSymbol: string = '';
  amount: number = 0;
  constructor(
    public dialogRef: MatDialogRef<SelectDeliveryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ships: MyShip[] }
  ) {

    // this.api.myShips().subscribe({ next: (ships) => this.ships.set(ships) });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  get maxAmount(): string {
    const deliveryGood = this.selectedShip.cargo.inventory.find(value => value.symbol === this.selectedSymbol);
    if (!deliveryGood) {
      return '';
    } else {
      return '(' + deliveryGood.units + ')';
    }
  }
}
