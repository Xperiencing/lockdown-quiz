import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgreeSliderComponent } from './agree-slider.component';

describe('AgreeSliderComponent', () => {
  let component: AgreeSliderComponent;
  let fixture: ComponentFixture<AgreeSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
