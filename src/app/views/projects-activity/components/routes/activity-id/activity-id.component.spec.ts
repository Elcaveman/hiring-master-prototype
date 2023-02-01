import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityIdComponent } from './activity-id.component';

describe('ActivityIdComponent', () => {
  let component: ActivityIdComponent;
  let fixture: ComponentFixture<ActivityIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
