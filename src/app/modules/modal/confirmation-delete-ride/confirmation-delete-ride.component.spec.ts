import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteRideComponent } from './confirmation-delete-ride.component';

describe('ConfirmationDeleteRideComponent', () => {
  let component: ConfirmationDeleteRideComponent;
  let fixture: ComponentFixture<ConfirmationDeleteRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
