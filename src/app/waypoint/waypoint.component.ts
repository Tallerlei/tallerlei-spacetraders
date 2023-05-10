import { Component, Input, signal } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { Waypoint } from '../shared/models/waypoint/waypoint';
import { Orbital } from '../shared/models/orbital/orbital';
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectShipDialogComponent } from '../dialogs/select-ship-dialog/select-ship-dialog.component';

@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent {
  @Input()
  set id(id: string) {
    this.loading = true;
    this.api.getWaypoint(id).subscribe(waypoint => {
      this.waypoint = signal(waypoint);
      this.loading = false;
    });
  }

  @Input() waypoint = signal(new Waypoint());
  @Input() fromList = false;

  loading: boolean = false;

  constructor(
    private api: SpacetradersApiService,
    private router: Router,
    private session: SessionService,
    public dialog: MatDialog
  ) { }

  goToWayPoint() {
    this.router.navigate(['waypoint', this.waypoint().symbol])
  }

  goToOrbital(orbital: Orbital) {
    this.router.navigate(['waypoint', orbital.symbol])
  }

  viewSystems(): void {
    this.router.navigate(['waypoints', this.waypoint().systemSymbol])
  }

  checkShipyard(): void {
    this.router.navigate(['shipyard', this.waypoint().symbol])
  }

  navigateTo(): void {
    const dialogRef = this.dialog.open(SelectShipDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(shipSymbol => {
      if (shipSymbol) {
        console.log(shipSymbol);
        this.api.navigateTo(shipSymbol, this.waypoint().symbol).subscribe({
          next: data => console.log(data)
        })
      }
    });
  }

  get isHome(): boolean {
    return this.waypoint().symbol === this.session.agent().headquarters;
  }
}
