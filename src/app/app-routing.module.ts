import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
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
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', outlet: 'side', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent, outlet: 'side' },
  { path: 'agent', component: AgentComponent, outlet: 'side' },
  { path: 'trait', component: TraitComponent },
  { path: 'orbit', component: OrbitComponent },
  { path: 'contract/:id', component: ContractDetailComponent },
  { path: 'contracts', component: ContractListComponent },
  { path: 'marketplace/:waypointSymbol', component: MarketplaceComponent },
  { path: 'ships', component: ShipsComponent },
  { path: 'ships/:id', component: ShipDetailsComponent },
  { path: 'shipyard/:waypointId', component: ShipyardComponent },
  { path: 'waypoint/:id', component: WaypointComponent },
  { path: 'waypoints/:system', component: WaypointListComponent },
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
