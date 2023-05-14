import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { ConfigurationData } from '../../../config/configuration-data';
import { Agent } from 'src/app/shared/models/agent/agent';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';
import { Contract } from 'src/app/shared/models/contract/contract';
import { ShipType } from 'src/app/shared/models/ship/ship-type';
import { MyShip } from 'src/app/shared/models/ship/my-ship';
import { Nav } from 'src/app/shared/models/ship/nav';
import { Fuel } from 'src/app/shared/models/ship/fuel';
import { Cargo } from 'src/app/shared/models/cargo/cargo';
import { Cooldown } from 'src/app/shared/models/ship/cooldown';
import { Extraction } from 'src/app/shared/models/ship/extraction';
import { Marketplace } from 'src/app/shared/models/market/marketplace';
import { ShipyardTransaction } from 'src/app/shared/models/transaction/shipyard-transaction';
import { MarketTransaction } from 'src/app/shared/models/transaction/market-transaction';
import { Status } from 'src/app/shared/models/status/status';
import { Faction } from 'src/app/shared/models/faction/faction';
import { FactionSymbol } from 'src/app/shared/models/faction/faction-symbol.enum';
import { Transaction } from 'src/app/shared/models/transaction/transaction';
import { MarketShip } from 'src/app/shared/models/ship/market-ship';
@Injectable({
  providedIn: 'root',
})
export class SpacetradersApiService {
  baseUrl: string = 'https://api.spacetraders.io/v2';
  headQuarter: string = 'X1-DF55-20250Z';
  constructor(private httpClient: HttpClient) {}

  status(): Observable<Status> {
    const url = this.baseUrl;
    return this.httpClient
      .get<Status>(url);
  }

  register(symbol: string, faction: FactionSymbol, email: string): Observable<{agent: Agent, ship: MyShip, contract: Contract, faction: Faction, token: string}> {
    const url = this.baseUrl + '/register';

    const body = {
      faction,
      email,
      symbol
    };
    return this.httpClient
      .post<{agent: Agent, ship: MyShip, contract: Contract, faction: Faction, token: string}>(url, body);
  }

  getAgent(): Observable<Agent> {
    const url = this.baseUrl + '/my/agent';
    return this.httpClient
      .get<Agent>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  reputation(): Observable<Agent> {
    const url = this.baseUrl + '/my/factions';
    return this.httpClient
      .get<Agent>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getWaypoint(waypointSymbol: string): Observable<Waypoint> {
    const systemSymbol = UtilitiesService.getTextBeforeLastIndexOf(
      waypointSymbol,
      '-'
    );
    const url =
      this.baseUrl +
      '/systems/' +
      systemSymbol +
      '/wayPoints/' +
      waypointSymbol;
    return this.httpClient
      .get<Waypoint>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getWaypoints(systemSymbol: string): Observable<Waypoint[]> {
    const url = this.baseUrl + '/systems/' + systemSymbol + '/waypoints';
    return this.httpClient
      .get<Waypoint[]>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getSystem(systemSymbol: string): Observable<Waypoint[]> {
    const url = this.baseUrl + '/systems/' + systemSymbol;
    return this.httpClient
      .get<Waypoint[]>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getContract(contractId: string): Observable<Contract> {
    const url = this.baseUrl + '/my/contracts/' + contractId;
    return this.httpClient
      .get<Contract>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getContracts(): Observable<Contract[]> {
    const url = this.baseUrl + '/my/contracts';
    return this.httpClient
      .get<Contract[]>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  acceptContract(
    contractId: string
  ): Observable<{ contract: Contract; agent: Agent }> {
    const url = this.baseUrl + '/my/contracts/' + contractId + '/accept';
    return this.httpClient
      .post<{ contract: Contract; agent: Agent }>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  checkShipyard(
    waypointSymbol: string
  ): Observable<{ symbol: string; shipTypes: ShipType[], ships?: MarketShip[], transactions?: Transaction[] }> {
    const systemSymbol = UtilitiesService.getTextBeforeLastIndexOf(
      waypointSymbol,
      '-'
    );
    const url =
      this.baseUrl +
      '/systems/' +
      systemSymbol +
      '/waypoints/' +
      waypointSymbol +
      '/shipyard';
    return this.httpClient
      .get<{ symbol: string; shipTypes: ShipType[], ships?: MarketShip[], transactions?: Transaction[] }>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  buyShip(
    shipType: ShipType,
    waypointSymbol: string
  ): Observable<{
    agent: Agent;
    ship: MyShip;
    transaction: ShipyardTransaction;
  }> {
    const url = this.baseUrl + '/my/ships';

    const body = {
      shipType: shipType.type,
      waypointSymbol: waypointSymbol,
    };

    return this.httpClient
      .post<{ agent: Agent; ship: MyShip; transaction: ShipyardTransaction }>(
        url,
        body,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
          }),
        }
      )
      .pipe(map((data: any) => data.data));
  }

  myShips(): Observable<MyShip[]> {
    const url = this.baseUrl + '/my/ships';

    return this.httpClient
      .get<MyShip[]>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  getShip(shipSymbol: string): Observable<MyShip> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol;

    return this.httpClient
      .get<MyShip>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  navigateTo(
    shipSymbol: string,
    waypointSymbol: string
  ): Observable<{ nav: Nav; fuel: Fuel }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/navigate';

    const body = {
      waypointSymbol,
    };
    return this.httpClient
      .post<{ nav: Nav; fuel: Fuel }>(url, body, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  dockShip(shipSymbol: string): Observable<{ nav: Nav }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/dock';
    return this.httpClient
      .post<{ nav: Nav }>(url, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  refuelShip(shipSymbol: string): Observable<{ agent: Agent; fuel: Fuel }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/refuel';
    return this.httpClient
      .post<{ agent: Agent; fuel: Fuel }>(url, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  orbitWaypoint(shipSymbol: string): Observable<{ nav: Nav }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/orbit';
    return this.httpClient
      .post<{ nav: Nav }>(url, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => data.data));
  }

  extractMinerals(
    shipSymbol: string
  ): Observable<{ cargo: Cargo; cooldown: Cooldown; extraction: Extraction }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/extract';
    return this.httpClient
      .post<{ cargo: Cargo; cooldown: Cooldown; extraction: Extraction }>(
        url,
        null,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
          }),
        }
      )
      .pipe(map((data: any) => data.data));
  }

  getCooldown(shipSymbol: string): Observable<Cooldown> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/cooldown';
    return this.httpClient
      .get<Cooldown>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => (data ? data.data : null)));
  }

  checkMarketplace(waypointSymbol: string): Observable<Marketplace> {
    const systemSymbol = UtilitiesService.getTextBeforeLastIndexOf(
      waypointSymbol,
      '-'
    );
    const url =
      this.baseUrl +
      '/systems/' +
      systemSymbol +
      '/waypoints/' +
      waypointSymbol +
      '/market';
    return this.httpClient
      .get<Marketplace>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
        }),
      })
      .pipe(map((data: any) => (data ? data.data : null)));
  }

  sellCargo(
    shipSymbol: string,
    cargoSymbol: string,
    units: number
  ): Observable<{
    agent: Agent;
    cargo: Cargo;
    transaction: MarketTransaction;
  }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/sell';

    const body = {
      symbol: cargoSymbol,
      units: units,
    };

    return this.httpClient
      .post<{ agent: Agent; cargo: Cargo; transaction: MarketTransaction }>(
        url,
        body,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
          }),
        }
      )
      .pipe(map((data: any) => (data ? data.data : null)));
  }

  fulfillContract(
    contractIdentifier: string
  ): Observable<{
    agent: Agent;
    cargo: Cargo;
    transaction: MarketTransaction;
  }> {
    const url = this.baseUrl + '/my/contracts/'+ contractIdentifier + '/fulfill'

    return this.httpClient
      .post<{ agent: Agent; cargo: Cargo; transaction: MarketTransaction }>(
        url,
        null,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
          }),
        }
      )
      .pipe(map((data: any) => (data ? data.data : null)));
  }

  deliverGoods(
    contractIdentifier: string,
    shipSymbol: string,
    tradeSymbol: string,
    units: number
  ): Observable<{
    agent: Agent;
    cargo: Cargo;
    transaction: MarketTransaction;
  }> {
    const url = this.baseUrl + '/my/contracts/' + contractIdentifier + '/deliver'

    const body = {
      shipSymbol,
      tradeSymbol,
      units: units,
    };
    return this.httpClient
      .post<{ agent: Agent; cargo: Cargo; transaction: MarketTransaction }>(
        url,
        body,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${new ConfigurationData().tokenValue}`,
          }),
        }
      )
      .pipe(map((data: any) => (data ? data.data : null)));
  }
}
