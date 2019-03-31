import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigation2Component } from './top-navigation-2.component';

describe('TopNavigation2Component', () => {
  let component: TopNavigation2Component;
  let fixture: ComponentFixture<TopNavigation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
