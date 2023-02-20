import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSelectComponent } from './participant-select.component';

describe('ParticipantSelectComponent', () => {
  let component: ParticipantSelectComponent;
  let fixture: ComponentFixture<ParticipantSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
