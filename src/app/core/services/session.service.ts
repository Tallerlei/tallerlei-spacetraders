import { Injectable, signal } from '@angular/core';
import { Agent } from 'src/app/shared/models/agent/agent';
import { SpacetradersApiService } from './spacetraders-api.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  agent = signal(new Agent());
  configuration: any = {};
  constructor(private api: SpacetradersApiService) {} //#endregion

  getRelevantData() {
    this.api.goToAgent().subscribe({ next: (agent) => this.agent.set(agent) });
  }
}
