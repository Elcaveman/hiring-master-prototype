import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityWriteModalComponent } from './activity-write-modal.component';

describe('ActivityWriteModalComponent', () => {
  let component: ActivityWriteModalComponent;
  let fixture: ComponentFixture<ActivityWriteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityWriteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityWriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
