import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCheckerComponent } from './slide-checker.component';

describe('SlideCheckerComponent', () => {
  let component: SlideCheckerComponent;
  let fixture: ComponentFixture<SlideCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
