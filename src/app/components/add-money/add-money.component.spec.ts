import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMoneyComponent } from './add-money.component';
import firebase from "firebase/compat";
import User = firebase.User;
import {UserService} from "../../services/user.service";


describe('AddMoneyComponent', () => {
  let component: AddMoneyComponent;
  let fixture: ComponentFixture<AddMoneyComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
