import { Component, Input, WritableSignal, signal } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Router } from '@angular/router';
import { Marketplace } from '../shared/models/market/marketplace';
import { TradeGood } from '../shared/models/market/tradegood';
import { MyShip } from '../shared/models/ship/my-ship';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent {
  marketplace: any = signal(new Marketplace());
  _waypointSymbol: string = '';
  shipInMarket: WritableSignal<MyShip> = signal(new MyShip());
  @Input()
  set waypointSymbol(waypointSymbol: string) {
    this.api.checkMarketplace(waypointSymbol).subscribe((marketplace) => {
      this.marketplace = signal(marketplace);
    });
    this._waypointSymbol = waypointSymbol;
  }
  constructor(private api: SpacetradersApiService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state !== undefined) {
      this.shipInMarket.set(
        <MyShip>this.router.getCurrentNavigation()?.extras.state
      );
    }
  }

  goToWaypoint() {
    this.router.navigate(['waypoint', this.waypointSymbol]);
  }

  get waypointSymbol(): string {
    return this._waypointSymbol;
  }
}
