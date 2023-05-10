import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';

@Component({
  selector: 'app-waypoint-list',
  templateUrl: './waypoint-list.component.html',
  styleUrls: ['./waypoint-list.component.scss']
})
export class WaypointListComponent {
  @Input()
  set system(system: string) {
    this.api.getWaypoints(system).subscribe(waypoints => this.waypoints.set(waypoints));
  }
  waypoints: WritableSignal<Waypoint[]> = signal([]);

  constructor(
    private api: SpacetradersApiService,
    private router: Router,
  ) { }

  // goToOrbital(orbital: Orbital) {
  //   this.router.navigate(['waypoint', orbital.symbol])
  // }
  // get isHome(): boolean {
  //   return this.waypoint().symbol === this.session.agent().headquarters;
  // }

  waypointSignal(waypoint: Waypoint): WritableSignal<Waypoint> {
    return signal(waypoint);
  }
}
