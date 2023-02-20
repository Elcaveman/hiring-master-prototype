import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTreeComponent } from './job-tree.component';

describe('JobTreeComponent', () => {
  let component: JobTreeComponent;
  let fixture: ComponentFixture<JobTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
