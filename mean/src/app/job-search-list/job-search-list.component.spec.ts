import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchListComponent } from './job-search-list.component';

describe('JobSearchListComponent', () => {
  let component: JobSearchListComponent;
  let fixture: ComponentFixture<JobSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
