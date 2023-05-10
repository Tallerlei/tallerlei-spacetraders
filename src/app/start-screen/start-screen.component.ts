import { ChangeDetectionStrategy, Component, signal, WritableSignal, effect } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { AgentData } from '../shared/models/agent/agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartScreenComponent {
  agent: WritableSignal<AgentData> = signal(new AgentData())
  constructor(
    private router: Router,
    private spacetradersService: SpacetradersApiService
  ) {
    effect(() => {
      console.log(`The current agent is: ${this.agent()}`);
    });

  }

  ngOnInit(): void {
    this.spacetradersService.getAgentData().subscribe((agent) => {
      this.agent.set(agent.data);
      // console.log(agent);
    });
  }

  visitHeadQuarterClicked() {

    this.router.navigate(['waypoint', this.agent().headquarters])

  }
}
