import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TraitComponent } from './trait/trait.component';
import { OrbitComponent } from './orbit/orbit.component';
import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { WaypointComponent } from './waypoint/waypoint.component';

const routes: Routes = [

  { path: 'start', component: StartScreenComponent },
  { path: 'trait', component: TraitComponent },
  { path: 'orbit', component: OrbitComponent },
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
