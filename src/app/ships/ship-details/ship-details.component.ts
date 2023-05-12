import {
  Component,
  Input,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Ship } from 'src/app/shared/models/ship/ship';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss'],
})
export class ShipDetailsComponent {
  extractCooldown = signal(0);
  arrival = signal(0);
  ship = signal(new Ship());
  @Input() fromList: boolean = false;
  @Input() id: string = '';

  // cooldown =

  waypoint: Waypoint = new Waypoint();

  loading: WritableSignal<boolean> = signal(false);
  constructor(
    private api: SpacetradersApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    effect(() => {
      if (this.ship().symbol !== '') {
        this.api.getCooldown(this.ship().symbol).subscribe({
          next: (data) =>
            data
              ? this.startInterval(data.expiration, this.extractCooldown)
              : null,
        });
        this.api.getWaypoint(this.ship().nav.waypointSymbol).subscribe({
          next: (waypoint) => (this.waypoint = waypoint),
        });
        if (this.ship().nav.flightMode === 'IN_TRANSIT') {
          this.startInterval(this.ship().nav.route.arrival, this.arrival);
        }
      }
    });
  }

  ngOnInit() {
    if (this.id) {
      this.loading.set(true);
      this.api.getShip(this.id).subscribe((ship) => {
        this.ship.set(ship);
        this.loading.set(false);
      });
    } else {
      console.log(this.ship().symbol);
    }
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
      next: (data) => this.ship.mutate((value) => (value.nav = data.nav)),
    });
  }

  refuelShip() {
    this.api.refuelShip(this.ship().symbol).subscribe({
      next: (data) =>
        this.ship.mutate((value) => {
          value.fuel = data.fuel;
        }),
    });
  }

  orbitWaypoint() {
    this.api.orbitWaypoint(this.ship().symbol).subscribe({
      next: (data) => this.ship.mutate((value) => (value.nav = data.nav)),
    });
  }

  extractMinerals() {
    this.api.extractMinerals(this.ship().symbol).subscribe({
      next: (data) =>
        this.ship.mutate((value) => {
          value.cargo = data.cargo;
          this._snackBar.open(
            'Extracted ' +
              data.extraction.yield.units +
              ' units of ' +
              data.extraction.yield.symbol +
              '.',
            'dismiss',
            { duration: 3000 }
          );
          this.startInterval(data.cooldown.expiration, this.extractCooldown);
        }),
    });
  }

  startInterval(
    expirationDate: string,
    countDownVariable: WritableSignal<number>
  ) {
    var t2 = new Date(expirationDate);
    const interval = setInterval(() => {
      var t1 = new Date(Date.now());

      var dif = t2.getTime() - t1.getTime();
      countDownVariable.set(Math.round(dif / 1000));
      if (countDownVariable() < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  goToMarket(): void {
    this.router.navigate(['marketplace', this.waypoint.symbol], {
      state: this.ship(),
    });
  }

  get hasMarket(): boolean {
    return (
      this.waypoint &&
      this.waypoint.traits.find((trait) => trait.symbol === 'MARKETPLACE') !==
        undefined
    );
  }

  get extractDisabled(): boolean {
    return this.ship().nav.status !== 'IN_ORBIT' || this.extractCooldown() > 0 || this.ship().cargo.capacity === this.ship().cargo.units;
  }
}
