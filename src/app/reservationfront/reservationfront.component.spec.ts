import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationfrontComponent } from './reservationfront.component';

describe('ReservationfrontComponent', () => {
  let component: ReservationfrontComponent;
  let fixture: ComponentFixture<ReservationfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationfrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
