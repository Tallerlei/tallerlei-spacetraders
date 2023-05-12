import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketplaceTradeComponent } from './marketplace-trade.component';

describe('MarketplaceTradeComponent', () => {
  let component: MarketplaceTradeComponent;
  let fixture: ComponentFixture<MarketplaceTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceTradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
