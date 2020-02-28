import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalpageComponent } from './analyticalpage.component';

describe('AnalyticalpageComponent', () => {
  let component: AnalyticalpageComponent;
  let fixture: ComponentFixture<AnalyticalpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticalpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
