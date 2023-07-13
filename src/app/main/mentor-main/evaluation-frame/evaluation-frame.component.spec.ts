import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationFrameComponent } from './evaluation-frame.component';

describe('EvaluationFrameComponent', () => {
  let component: EvaluationFrameComponent;
  let fixture: ComponentFixture<EvaluationFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationFrameComponent]
    });
    fixture = TestBed.createComponent(EvaluationFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
