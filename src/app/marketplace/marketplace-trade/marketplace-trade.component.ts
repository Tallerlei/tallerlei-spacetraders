import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpacetradersApiService } from 'src/app/core/services/spacetraders-api.service';
import { TradeGood } from 'src/app/shared/models/market/tradegood';
import { Ship } from 'src/app/shared/models/ship/ship';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-marketplace-trade',
  templateUrl: './marketplace-trade.component.html',
  styleUrls: ['./marketplace-trade.component.scss'],
})
export class MarketplaceTradeComponent {
  @Input() tradeGood: TradeGood = new TradeGood();
  @Input() ship: Ship = new Ship();
  form: FormGroup;
  constructor(
    private api: SpacetradersApiService,
    private fb: FormBuilder,
    private messageService: MessageService
    ) {
    this.form = this.fb.group({
      buy_amount: [''],
      sell_amount: [''],
    });
  }
  buyGood(tradeGood: TradeGood) {
    this.api.sellCargo(
      this.ship.symbol,
      tradeGood.symbol,
      +this.form.controls['sell_amount'].value
    );
  }

  sellGood(tradeGood: TradeGood) {
    this.api.sellCargo(
      this.ship.symbol,
      tradeGood.symbol,
      +this.form.controls['sell_amount'].value
    ).subscribe({next: data => {
      this.ship.cargo = data.cargo;
      this.messageService.snack('Sold ' + data.transaction.units + ' units of ' +data.transaction.tradeSymbol + ' for a price of ' + data.transaction.pricePerUnit + ' making a total of ' + data.transaction.totalPrice + '.')
    }});
  }

  hasCargo(tradeGood: TradeGood) {
    return this.ship.cargo.inventory.find(
      (item) => item.symbol === tradeGood.symbol
    );
  }

  unitsInInventory(tradeGood: TradeGood) {
    return this.ship.cargo.inventory.find(
      (item) => item.symbol === tradeGood.symbol
    ).units;
  }
}
