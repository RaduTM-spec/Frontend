import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceModalComponent } from './add-attendance-modal.component';

describe('AddAttendanceModalComponent', () => {
  let component: AddAttendanceModalComponent;
  let fixture: ComponentFixture<AddAttendanceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttendanceModalComponent]
    });
    fixture = TestBed.createComponent(AddAttendanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
