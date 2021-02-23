import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameSelectComponent } from './game-select.component';

describe('GameSelectComponent', () => {
  let component: GameSelectComponent;
  let fixture: ComponentFixture<GameSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
