import { Component, WritableSignal, signal } from '@angular/core';
import { MyShip } from '../shared/models/ship/my-ship';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Router } from '@angular/router';
import { FleetService } from './fleet.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss']
})
export class ShipsComponent {
  ships: WritableSignal<MyShip[]> = signal([]);

  constructor(
    private api: SpacetradersApiService,
    private fleetService: FleetService,
    private router: Router,
  ) {
    this.api.myShips().subscribe(ships => this.ships.set(ships));
  }

  shipSignal(ship: MyShip): WritableSignal<MyShip> {
    return signal(ship);
  }
}
