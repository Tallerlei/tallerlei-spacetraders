import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitComponent } from './orbit.component';

describe('OrbitComponent', () => {
  let component: OrbitComponent;
  let fixture: ComponentFixture<OrbitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitComponent]
    });
    fixture = TestBed.createComponent(OrbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
