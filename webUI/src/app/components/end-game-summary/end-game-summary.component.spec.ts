import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EndGameSummaryComponent } from './end-game-summary.component';

describe('EndGameSummaryComponent', () => {
  let component: EndGameSummaryComponent;
  let fixture: ComponentFixture<EndGameSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EndGameSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
