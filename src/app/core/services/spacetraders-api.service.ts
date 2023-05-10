import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs'

import { BearerToken } from '../../../config/bearer-token';
import { Agent } from 'src/app/shared/models/agent/agent';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Waypoint } from 'src/app/shared/models/waypoint/waypoint';
@Injectable({
  providedIn: 'root'
})
export class SpacetradersApiService {
  baseUrl: string = 'https://api.spacetraders.io/v2';
  headQuarter: string = 'X1-DF55-20250Z';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAgentData(): Observable<Agent> {
    const url = this.baseUrl + '/my/agent';
    return this.httpClient.get<Agent>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    })
  }

  getWaypoint(waypointIdentifier: string): Observable<Waypoint> {
    const url = this.baseUrl + '/systems/' + UtilitiesService.getTextBeforeLastIndexOf(waypointIdentifier, '-') + '/wayPoints/' + waypointIdentifier;
    return this.httpClient.get<Waypoint>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    }).pipe(
      map((data: any) => data.data)
    )
  }

  getWaypoints(systemIdentifier: string): Observable<Waypoint[]> {
    const url = this.baseUrl + '/systems/' + systemIdentifier;
    return this.httpClient.get<Waypoint[]>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${new BearerToken().tokenValue}`
      })
    })
  }

}
