import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheWordComponent } from './guess-the-word.component';

describe('GuessTheWordComponent', () => {
  let component: GuessTheWordComponent;
  let fixture: ComponentFixture<GuessTheWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessTheWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessTheWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
