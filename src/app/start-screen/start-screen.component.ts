import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session.service';
import { Agent } from '../shared/models/agent/agent';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartScreenComponent {
  constructor(
    private router: Router,
    private session: SessionService
  ) { }

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
