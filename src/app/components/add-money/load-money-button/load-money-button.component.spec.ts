import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoneyButtonComponent } from './load-money-button.component';

describe('LoadMoneyButtonComponent', () => {
  let component: LoadMoneyButtonComponent;
  let fixture: ComponentFixture<LoadMoneyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadMoneyButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoneyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
