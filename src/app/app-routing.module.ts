import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TraitComponent } from './trait/trait.component';
import { OrbitComponent } from './orbit/orbit.component';
import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { WaypointComponent } from './waypoint/waypoint.component';
import { ContractListComponent } from './contracts/contract-list/contract-list.component';
import { ContractDetailComponent } from './contracts/contract-detail/contract-detail.component';
import { WaypointListComponent } from './waypoint/waypoint-list/waypoint-list.component';
import { ShipyardComponent } from './trait/shipyard/shipyard.component';
import { ShipsComponent } from './ships/ship-list.component';
import { ShipDetailsComponent } from './ships/ship-details/ship-details.component';

const routes: Routes = [
{path: '', redirectTo: 'start', outlet: 'side', pathMatch: 'full'},
  { path: 'start', component: StartScreenComponent, outlet: 'side' },
  { path: 'trait', component: TraitComponent },
  { path: 'orbit', component: OrbitComponent },
  { path: 'contracts', component: ContractListComponent },
  { path: 'contract/:id', component: ContractDetailComponent },
  { path: 'waypoints/:system', component: WaypointListComponent },
  { path: 'shipyard/:waypointId', component: ShipyardComponent },
  { path: 'ships', component: ShipsComponent },
  { path: 'ships/:id', component: ShipDetailsComponent },
  { path: 'waypoint/:id', component: WaypointComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
