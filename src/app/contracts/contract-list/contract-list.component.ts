import { Component, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { Contract } from 'src/app/shared/models/contract/contract';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent {
  contracts: WritableSignal<Contract[]> = signal([]);

  constructor(
    private router: Router,
    private api: SpacetradersApiService
  ) {
    this.api.getContracts().subscribe(contractList => this.contracts.set(contractList));
  }

  showContractDetails(contract: Contract) {
    this.router.navigate(['contract', contract.id]);
  }
  acceptContract(contract: Contract) {
    this.api.acceptContract(contract.id)
  }


}
