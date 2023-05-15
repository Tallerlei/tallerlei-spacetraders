import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session.service';
import { Agent } from '../shared/models/agent/agent';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentComponent {
  reputation = signal({})

  constructor(
    private api: SpacetradersApiService,
    private router: Router,
    private session: SessionService
  ) {}

  visitHeadQuarterClicked() {
    this.router.navigate(['waypoint', this.agent.headquarters])
  }

  showContracts() {
    this.router.navigate(['contracts']);
  }

  showShips() {
    this.router.navigate(['ships']);
  }

  get agent(): Agent {
    return this.session.agent();
  }
}
