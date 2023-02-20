import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSelectComponent } from './candidate-select.component';

describe('CandidateSelectComponent', () => {
  let component: CandidateSelectComponent;
  let fixture: ComponentFixture<CandidateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
