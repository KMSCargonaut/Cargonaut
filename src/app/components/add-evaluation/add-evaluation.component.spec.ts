import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationComponent } from './add-evaluation.component';

describe('AddEvaluationComponent', () => {
  let component: AddEvaluationComponent;
  let fixture: ComponentFixture<AddEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
