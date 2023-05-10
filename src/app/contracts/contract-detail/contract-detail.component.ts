import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Contract } from 'src/app/shared/models/contract/contract';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent {
  @Input()
  set id(id: string) {
    this.api.getContract(id).subscribe(contract => this.contract.set(contract));
  }
  contract = signal(new Contract());



  constructor(
    private router: Router,
    private api: SpacetradersApiService
  ) { }


  acceptContract() {
    this.api.acceptContract(this.contract().id)
  }

  goToWayPoint(waypointIdentifier: string) {
    this.router.navigate(['waypoint', waypointIdentifier]);
  }
}
