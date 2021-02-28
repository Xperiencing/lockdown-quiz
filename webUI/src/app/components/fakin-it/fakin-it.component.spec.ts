import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakinItComponent } from './fakin-it.component';

describe('FakinItComponent', () => {
  let component: FakinItComponent;
  let fixture: ComponentFixture<FakinItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakinItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakinItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
