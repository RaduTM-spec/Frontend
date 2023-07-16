import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityModalComponent } from './create-activity-modal.component';

describe('CreateActivityModalComponent', () => {
  let component: CreateActivityModalComponent;
  let fixture: ComponentFixture<CreateActivityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActivityModalComponent]
    });
    fixture = TestBed.createComponent(CreateActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
