import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs'

import { BearerToken } from '../../../config/bearer-token';
import { Agent } from 'src/app/shared/models/agent/agent';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';
import { Contract } from 'src/app/shared/models/contract/contract';
import { ShipType } from 'src/app/shared/models/ship/ship-type';
import { Ship } from 'src/app/shared/models/ship/ship';
import { Transaction } from 'src/app/shared/models/transaction/transaction';
import { Nav } from 'src/app/shared/models/ship/nav';
import { Fuel } from 'src/app/shared/models/ship/fuel';
@Injectable({
  providedIn: 'root'
})
export class SpacetradersApiService {
  baseUrl: string = 'https://api.spacetraders.io/v2';
  headQuarter: string = 'X1-DF55-20250Z';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAgent(): Observable<Agent> {
    const url = this.baseUrl + '/my/agent';
    return this.httpClient.get<Agent>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getWaypoint(waypointIdentifier: string): Observable<Waypoint> {
    const systemSymbol = UtilitiesService.getTextBeforeLastIndexOf(waypointIdentifier, '-');
    const url = this.baseUrl + '/systems/' + systemSymbol + '/wayPoints/' + waypointIdentifier;
    return this.httpClient.get<Waypoint>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getWaypoints(systemIdentifier: string): Observable<Waypoint[]> {
    const url = this.baseUrl + '/systems/' + systemIdentifier + '/waypoints';
    return this.httpClient.get<Waypoint[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getSystem(systemIdentifier: string): Observable<Waypoint[]> {
    const url = this.baseUrl + '/systems/' + systemIdentifier;
    return this.httpClient.get<Waypoint[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getContract(contractId: string): Observable<Contract> {
    const url = this.baseUrl + '/my/contracts/' + contractId;
    return this.httpClient.get<Contract>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getContracts(): Observable<Contract[]> {
    const url = this.baseUrl + '/my/contracts';
    return this.httpClient.get<Contract[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  acceptContract(contractId: string): Observable<{ contract: Contract, agent: Agent }> {
    const url = this.baseUrl + '/my/contracts/' + contractId;
    return this.httpClient.post<Contract[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  checkShipyard(waypointIdentifier: string): Observable<{ symbol: string, shipTypes: ShipType[] }> {
    const systemSymbol = UtilitiesService.getTextBeforeLastIndexOf(waypointIdentifier, '-');
    const url = this.baseUrl + '/systems/' + systemSymbol + '/waypoints/' + waypointIdentifier + '/shipyard';
    return this.httpClient.get<{ symbol: string, shipTypes: ShipType[] }>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  buyShip(shipType: ShipType, waypointIdentifier: string): Observable<{ agent: Agent, ship: Ship, transaction: Transaction }> {
    const url = this.baseUrl + '/my/ships';

    const body = {
      shipType: shipType.type,
      waypointSymbol: waypointIdentifier,
    };

    return this.httpClient.post<{ agent: Agent, ship: Ship, transaction: Transaction }>(url, body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  myShips(): Observable<Ship[]> {
    const url = this.baseUrl + '/my/ships';

    return this.httpClient.get<Ship[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getShip(shipIdentifier: string): Observable<Ship> {
    const url = this.baseUrl + '/my/ships/' + shipIdentifier;

    return this.httpClient.get<Ship>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  navigateTo(shipSymbol: string, waypointSymbol: string): Observable<{ nav: Nav, fuel: Fuel }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/navigate';

    const body = {
      waypointSymbol,
    };
    return this.httpClient.post<{ nav: Nav, fuel: Fuel }>(url, body, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  dockShip(shipSymbol: string): Observable<{ nav: Nav }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/dock';
    return this.httpClient.post<{ nav: Nav }>(url, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  refuelShip(shipSymbol: string): Observable<{ agent: Agent, fuel: Fuel }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/refuel';
    return this.httpClient.post<{ agent: Agent, fuel: Fuel }>(url, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  orbitWaypoint(shipSymbol: string): Observable<{ nav: Nav }> {
    const url = this.baseUrl + '/my/ships/' + shipSymbol + '/orbit';
    return this.httpClient.post<{ nav: Nav }>(url, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }



}
