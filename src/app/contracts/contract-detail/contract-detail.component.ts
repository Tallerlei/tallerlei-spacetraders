import { Component, Input, WritableSignal, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Contract } from 'src/app/shared/models/contract/contract';
import { Ship } from 'src/app/shared/models/ship/ship';

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
  shipsAtWaypoint: Ship[] = [];
  ships: WritableSignal<Ship[]> = signal([]);

  constructor(
    private router: Router,
    private api: SpacetradersApiService
  ) {
    effect(()=> {
      this.shipsAtWaypoint = this.ships().filter(ship => this.contract().terms.deliver.find( delivery => delivery.destinationSymbol ===ship.nav.waypointSymbol) && ship.nav.flightMode !== 'IN_TRANSIT');
    })
    this.api.myShips().subscribe(ships => {
      this.ships.set(ships);
    });
  }

  acceptContract() {
    this.api.acceptContract(this.contract().id).subscribe({ next: data => console.log(data) });
  }

  deliverGoods() {
    this.api.acceptContract(this.contract().id).subscribe({ next: data => console.log(data) });
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
