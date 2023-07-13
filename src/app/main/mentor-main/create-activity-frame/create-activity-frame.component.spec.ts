import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityFrameComponent } from './create-activity-frame.component';

describe('CreateActivityFrameComponent', () => {
  let component: CreateActivityFrameComponent;
  let fixture: ComponentFixture<CreateActivityFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActivityFrameComponent]
    });
    fixture = TestBed.createComponent(CreateActivityFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
