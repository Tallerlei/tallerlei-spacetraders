import { Component, Input, signal } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Router } from '@angular/router';
import { Marketplace } from '../shared/models/market/marketplace';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent {
  marketplace: any = signal(new Marketplace());
  _waypointSymbol: string = '';
  @Input()
  set waypointSymbol(waypointSymbol: string) {
    this.api.checkMarketplace(waypointSymbol).subscribe(marketplace => {
      this.marketplace = signal(marketplace);
    });
    this._waypointSymbol = waypointSymbol;
  }
  constructor(
    private api: SpacetradersApiService,
    private router: Router
  ) { }

  goToWaypoint() {
    this.router.navigate(['waypoint', this.waypointSymbol]);
  }

  get waypointSymbol(): string {
    return this._waypointSymbol;
  }
}
