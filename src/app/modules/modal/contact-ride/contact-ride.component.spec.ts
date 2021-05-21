import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRideComponent } from './contact-ride.component';

describe('ContactRideComponent', () => {
  let component: ContactRideComponent;
  let fixture: ComponentFixture<ContactRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
