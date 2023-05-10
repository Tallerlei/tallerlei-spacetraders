import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Ship } from 'src/app/shared/models/ship/ship';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent {
  @Input()
  set id(id: string) {
    this.loading = true;
    this.api.getShip(id).subscribe(ship => {

      this.ship = signal(ship)
      this.loading = false;
      console.log('Signal ready');
    });
  }
  @Input() ship = signal(new Ship());
  @Input() fromList: boolean = false

  loading: boolean = false;
  constructor(
    private api: SpacetradersApiService,
    private router: Router,
  ) {
  }
  goToShip() {
    this.router.navigate(['ships', this.ship().symbol]);
  }

  viewShips() {
    this.router.navigate(['ships']);
  }

}
