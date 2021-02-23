import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabooComponent } from './taboo.component';

describe('TabooComponent', () => {
  let component: TabooComponent;
  let fixture: ComponentFixture<TabooComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
