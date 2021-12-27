import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteStarsComponent } from './vote-stars.component';

describe('VoteStarsComponent', () => {
  let component: VoteStarsComponent;
  let fixture: ComponentFixture<VoteStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
