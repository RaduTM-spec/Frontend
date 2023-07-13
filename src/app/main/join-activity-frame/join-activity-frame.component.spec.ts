import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinActivityFrameComponent } from './join-activity-frame.component';

describe('JoinActivityFrameComponent', () => {
  let component: JoinActivityFrameComponent;
  let fixture: ComponentFixture<JoinActivityFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinActivityFrameComponent]
    });
    fixture = TestBed.createComponent(JoinActivityFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
