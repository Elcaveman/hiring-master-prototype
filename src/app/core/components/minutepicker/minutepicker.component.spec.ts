import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutepickerComponent } from './minutepicker.component';

describe('MinutepickerComponent', () => {
  let component: MinutepickerComponent;
  let fixture: ComponentFixture<MinutepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
