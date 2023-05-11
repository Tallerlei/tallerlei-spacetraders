import { Component, Input, Signal, WritableSignal, effect, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Ship } from 'src/app/shared/models/ship/ship';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent {
  extractCooldown: number = 0;
  cooldownActive: WritableSignal<number> = signal(0);
  @Input()
  set id(id: string) {
    this.loading = true;
    this.api.getShip(id).subscribe(ship => {
      this.ship = signal(ship)
      this.loading = false;
    });
  }
  @Input() ship = signal(new Ship());
  @Input() fromList: boolean = false

  loading: boolean = false;
  constructor(
    private api: SpacetradersApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.api.getCooldown(this.ship().symbol).subscribe({
      next: data => data ? this.startInterval(data.expiration) : null
    });
  }
  goToShip() {
    this.router.navigate(['ships', this.ship().symbol]);
  }

  viewShips() {
    this.router.navigate(['ships']);
  }

  showWaypoint(waypointSymbol: string) {
    this.router.navigate(['waypoint', waypointSymbol]);
  }

  dockShip() {
    this.api.dockShip(this.ship().symbol).subscribe({
      next: data => this.ship.mutate(value => value.nav = data.nav)
    });
  }

  refuelShip() {
    this.api.refuelShip(this.ship().symbol).subscribe({
      next: data => this.ship.mutate(value => {
        value.fuel = data.fuel;
      })
    }
    );
  }

  orbitWaypoint() {
    this.api.orbitWaypoint(this.ship().symbol).subscribe({
      next: data => this.ship.mutate(value => value.nav = data.nav)
    });
  }

  extractMinerals() {
    this.api.extractMinerals(this.ship().symbol).subscribe({
      next: data => this.ship.mutate(value => {
        value.cargo = data.cargo;
        this._snackBar.open('Extracted ' + data.extraction.yield.units + ' units of ' + data.extraction.yield.symbol + '.', 'dismiss', { duration: 3000 });
        this.startInterval(data.cooldown.expiration)
      })
    });
  }

  startInterval(expirationDate: string) {
    var t2 = new Date(expirationDate);
    const interval = setInterval(() => {
      var t1 = new Date(Date.now());

      var dif = t2.getTime() - t1.getTime();
      this.extractCooldown = Math.round(dif / 1000);
      if (this.extractCooldown < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  get extractDisabled(): boolean {
    return this.ship().nav.status !== 'IN_ORBIT' || this.extractCooldown > 0;
  }
}
