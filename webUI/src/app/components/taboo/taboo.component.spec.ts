import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabooComponent } from './taboo.component';

describe('TabooComponent', () => {
  let component: TabooComponent;
  let fixture: ComponentFixture<TabooComponent>;

  beforeEach(async(() => {
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
