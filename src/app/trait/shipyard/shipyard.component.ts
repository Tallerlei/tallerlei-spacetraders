import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { MarketShip } from 'src/app/shared/models/ship/market-ship';
import { MyShip } from 'src/app/shared/models/ship/my-ship';
import { ShipType } from 'src/app/shared/models/ship/ship-type';
import { Transaction } from 'src/app/shared/models/transaction/transaction';

@Component({
  selector: 'app-shipyard',
  templateUrl: './shipyard.component.html',
  styleUrls: ['./shipyard.component.scss']
})
export class ShipyardComponent {
  @Input()
  set waypointId(waypointId: string) {
    this.api.checkShipyard(waypointId).subscribe(shipyardData => this.shipyard.set(shipyardData));
    this._waypointSymbol = waypointId;
  }

  _waypointSymbol: string = ''
  shipyard: WritableSignal<{ symbol: string; shipTypes: ShipType[], ships?: MarketShip[], transactions?: Transaction[] }> = signal({ symbol: '', shipTypes: [] })

  constructor(
    private api: SpacetradersApiService,
    private router: Router
  ) { }

  buyShip(shipType: ShipType) {
    this.api.buyShip(shipType, this.shipyard().symbol).subscribe(purchaseData => console.log(purchaseData));
  }

  goToWaypoint() {
    this.router.navigate(['waypoint', this.waypointSymbol]);
  }

  get waypointSymbol(): string {
    return this._waypointSymbol;
  }
}
