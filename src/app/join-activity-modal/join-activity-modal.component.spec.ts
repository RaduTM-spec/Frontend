import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinActivityModalComponent } from './join-activity-modal.component';

describe('JoinActivityModalComponent', () => {
  let component: JoinActivityModalComponent;
  let fixture: ComponentFixture<JoinActivityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinActivityModalComponent]
    });
    fixture = TestBed.createComponent(JoinActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
