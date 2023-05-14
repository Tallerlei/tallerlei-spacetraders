import { Component, Input, WritableSignal, effect, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { SelectDeliveryDialogComponent } from 'src/app/dialogs/select-delivery-dialog/select-delivery-dialog.component';
import { Contract } from 'src/app/shared/models/contract/contract';
import { MyShip } from 'src/app/shared/models/ship/my-ship';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent {
  @Input()
  set id(id: string) {
    this.api.getContract(id).subscribe(contract => this.contract.set(contract));
  }
  contract = signal(new Contract());
  shipsAtWaypoint: MyShip[] = [];
  ships: WritableSignal<MyShip[]> = signal([]);

  constructor(
    private router: Router,
    private api: SpacetradersApiService,
    public dialog: MatDialog
  ) {
    effect(() => {
      this.shipsAtWaypoint = this.ships().filter(ship => this.contract().terms.deliver.find(delivery => delivery.destinationSymbol === ship.nav.waypointSymbol) && ship.nav.flightMode !== 'IN_TRANSIT');
    })
    this.api.myShips().subscribe(ships => {
      this.ships.set(ships);
    });
  }

  acceptContract() {
    this.api.acceptContract(this.contract().id).subscribe({ next: data => this.contract.set(data.contract) });
  }

  deliverGoods() {
    const dialogRef = this.dialog.open(SelectDeliveryDialogComponent, {
      data: { ships: this.shipsAtWaypoint },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.api.deliverGoods(this.contract().id, data.shipSymbol, data.tradeSymbol, data.units).subscribe({ next: data => console.log(data) });
      }
    });
  }

  fulfillContract() {
    this.api.fulfillContract(this.contract().id).subscribe({ next: data => console.log(data) });
  }

  goToWayPoint(waypointIdentifier: string) {
    this.router.navigate(['waypoint', waypointIdentifier]);
  }

  canDeliver(): boolean {
    return this.contract().accepted && this.shipsAtWaypoint.length > 0;
  }
}
