import { Component, WritableSignal, signal } from '@angular/core';
import { Ship } from '../shared/models/ship/ship';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss']
})
export class ShipsComponent {
  ships: WritableSignal<Ship[]> = signal([]);

  constructor(
    private api: SpacetradersApiService,
    private router: Router,
  ) {
    this.api.myShips().subscribe(ships => this.ships.set(ships));
  }

  shipSignal(ship: Ship): WritableSignal<Ship> {
    return signal(ship);
  }
}
