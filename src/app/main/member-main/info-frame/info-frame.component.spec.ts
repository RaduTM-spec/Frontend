import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFrameComponent } from './info-frame.component';

describe('InfoFrameComponent', () => {
  let component: InfoFrameComponent;
  let fixture: ComponentFixture<InfoFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoFrameComponent]
    });
    fixture = TestBed.createComponent(InfoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
