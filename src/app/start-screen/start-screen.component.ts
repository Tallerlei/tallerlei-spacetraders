import { Component, signal } from '@angular/core';
import { SpacetradersApiService } from '../core/services/spacetraders-api.service';
import { SessionService } from '../core/services/session.service';
import { Router } from '@angular/router';
import { Status } from '../shared/models/status/status';
import { FactionSymbol } from '../shared/models/faction/faction-symbol.enum';
import { ConfigurationData } from 'src/config/configuration-data';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent {

  status = signal(new Status())
  constructor(
    private api: SpacetradersApiService,
    private router: Router,
    private session: SessionService,
  ) {
    this.session.configuration = new ConfigurationData()
    this.api.status().subscribe(
      {
        next: data => {
          console.log(data)
          this.status.set(data)
        }
      }
    );
  }

  getAgent() {
    this.router.navigate([{ outlets: { side: ['agent'] } }]);
  }

  register() {
    this.api.register(this.session.configuration.playerName, FactionSymbol.ASTRO, this.session.configuration.email).subscribe({
      next: agent => console.log(agent)
    })
  }
}
