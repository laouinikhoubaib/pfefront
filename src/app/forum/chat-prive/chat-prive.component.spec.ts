import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPriveComponent } from './chat-prive.component';

describe('ChatPriveComponent', () => {
  let component: ChatPriveComponent;
  let fixture: ComponentFixture<ChatPriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
