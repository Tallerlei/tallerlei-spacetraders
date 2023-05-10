import { Component, Input, signal } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Waypoint } from '../shared/models/waypoint/waypoint';

@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent {
  @Input()
  set id(id: string) {
    this.stService.getWaypoint(id).subscribe(waypoint => this.waypoint.set(waypoint));
  }
  waypoint = signal(new Waypoint());

  constructor(
    private stService: SpacetradersApiService
  ) { }

}
