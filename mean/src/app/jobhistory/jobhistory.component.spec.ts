import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobhistoryComponent } from './jobhistory.component';

describe('JobhistoryComponent', () => {
  let component: JobhistoryComponent;
  let fixture: ComponentFixture<JobhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
