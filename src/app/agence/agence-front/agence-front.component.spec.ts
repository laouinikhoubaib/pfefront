import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceFrontComponent } from './agence-front.component';

describe('AgenceFrontComponent', () => {
  let component: AgenceFrontComponent;
  let fixture: ComponentFixture<AgenceFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenceFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
