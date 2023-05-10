import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Other App Modules
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CoreModule } from './core/core.module';


// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { OrbitComponent } from './orbit/orbit.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { TraitComponent } from './trait/trait.component';
import { CommonModule } from '@angular/common';
import { WaypointComponent } from './waypoint/waypoint.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    OrbitComponent,
    StartScreenComponent,
    TraitComponent,
    WaypointComponent,
  ],
  imports: [
    AngularMaterialModule,
   CommonModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
