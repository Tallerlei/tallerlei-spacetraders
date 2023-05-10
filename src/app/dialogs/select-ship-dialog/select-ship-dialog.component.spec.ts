import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShipDialogComponent } from './select-ship-dialog.component';

describe('SelectShipDialogComponent', () => {
  let component: SelectShipDialogComponent;
  let fixture: ComponentFixture<SelectShipDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectShipDialogComponent]
    });
    fixture = TestBed.createComponent(SelectShipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
