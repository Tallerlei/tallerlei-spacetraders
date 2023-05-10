import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { ShipType } from 'src/app/shared/models/ship/ship-type';

@Component({
  selector: 'app-shipyard',
  templateUrl: './shipyard.component.html',
  styleUrls: ['./shipyard.component.scss']
})
export class ShipyardComponent {
  @Input()
  set waypointId(waypointId: string) {
    this.api.checkShipyard(waypointId).subscribe(shipyardData => this.shipyard.set(shipyardData));
  }

  shipyard: WritableSignal<{ symbol: string, shipTypes: ShipType[] }> = signal({ symbol: '', shipTypes: [] })

  constructor(
    private api: SpacetradersApiService,
    private router: Router,
  ) { }

  buyShip(shipType: ShipType) {
    this.api.buyShip(shipType, this.shipyard().symbol).subscribe(purchaseData => console.log(purchaseData));
  }
}
