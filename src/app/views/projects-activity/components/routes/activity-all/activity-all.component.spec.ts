import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAllComponent } from './activity-all.component';

describe('ActivityAllComponent', () => {
  let component: ActivityAllComponent;
  let fixture: ComponentFixture<ActivityAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
