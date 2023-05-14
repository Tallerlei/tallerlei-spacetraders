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
import { AgentComponent } from './agent/agent.component';
import { TraitComponent } from './trait/trait.component';
import { CommonModule } from '@angular/common';
import { WaypointComponent } from './waypoint/waypoint.component';
import { ContractListComponent } from './contracts/contract-list/contract-list.component';
import { ContractDetailComponent } from './contracts/contract-detail/contract-detail.component';
import { WaypointListComponent } from './waypoint/waypoint-list/waypoint-list.component';
import { ShipyardComponent } from './trait/shipyard/shipyard.component';
import { ShipsComponent } from './ships/ship-list.component';
import { ShipDetailsComponent } from './ships/ship-details/ship-details.component';
import { SelectShipDialogComponent } from './dialogs/select-ship-dialog/select-ship-dialog.component';
import { GlobalHttpInterceptorService } from './shared/services/global-http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MarketplaceTradeComponent } from './marketplace/marketplace-trade/marketplace-trade.component';
import { SelectDeliveryDialogComponent } from './dialogs/select-delivery-dialog/select-delivery-dialog.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    OrbitComponent,
    AgentComponent,
    TraitComponent,
    WaypointComponent,
    ContractListComponent,
    ContractDetailComponent,
    WaypointListComponent,
    ShipyardComponent,
    ShipsComponent,
    ShipDetailsComponent,
    SelectShipDialogComponent,
    MarketplaceComponent,
  MarketplaceTradeComponent,SelectDeliveryDialogComponent,StartScreenComponent,],
  imports: [
    AngularMaterialModule,
   CommonModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
