import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorViewTeamComponent } from './mentor-view-team.component';

describe('MentorViewTeamComponent', () => {
  let component: MentorViewTeamComponent;
  let fixture: ComponentFixture<MentorViewTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorViewTeamComponent]
    });
    fixture = TestBed.createComponent(MentorViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
