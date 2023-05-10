import { Component } from '@angular/core';
import { SpacetradersApiService } from './core/services/spacetraders-api.service';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentTitle: string = 'Hello Spacetraders';
  constructor(
    private api: SpacetradersApiService,
    private session: SessionService,
  ) {
    this.api.getAgent().subscribe(
      {
        next: agent => this.session.agent.set(agent)
      }
    );
  }
}
