import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVerwaltenComponent } from './account-verwalten.component';

describe('AccountVerwaltenComponent', () => {
  let component: AccountVerwaltenComponent;
  let fixture: ComponentFixture<AccountVerwaltenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountVerwaltenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVerwaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
