import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamFrameComponent } from './view-team-frame.component';

describe('ViewTeamFrameComponent', () => {
  let component: ViewTeamFrameComponent;
  let fixture: ComponentFixture<ViewTeamFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTeamFrameComponent]
    });
    fixture = TestBed.createComponent(ViewTeamFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
