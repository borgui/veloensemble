import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousRideComponent } from './previous-ride.component';

describe('PreviousRideComponent', () => {
  let component: PreviousRideComponent;
  let fixture: ComponentFixture<PreviousRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
