import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent3 } from './register3.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent3;
  let fixture: ComponentFixture<RegisterComponent3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent3 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
