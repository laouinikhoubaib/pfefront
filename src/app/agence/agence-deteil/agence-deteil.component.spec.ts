import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceDeteilComponent } from './agence-deteil.component';

describe('AgenceDeteilComponent', () => {
  let component: AgenceDeteilComponent;
  let fixture: ComponentFixture<AgenceDeteilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenceDeteilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceDeteilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
