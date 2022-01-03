import {fakeAsync, TestBed} from '@angular/core/testing';
import { UserService } from './user.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subject} from "rxjs";
import {MockProvider} from "ng-mocks";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {FirebaseAppModule} from "@angular/fire/app";
//import {PROVIDED_FIREBASE_APPS} from "@angular/fire/app/app.module";

describe('UserService', () => {
  let service: UserService;
  let fireAuthService: AngularFireAuth;
  let userCreds = {
    email: 'test@test.de',
    password: 'testtest'
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FirebaseAppModule
      ],
      providers: [
        UserService,
        //MockProvider(AngularFireAuth)
        //MockProvider(PROVIDED_FIREBASE_APPS)
      ]
    });//.compileComponents();
    /*service = TestBed.inject(UserService);
    fireAuthService = TestBed.inject(AngularFireAuth);*/
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should executed login method with success', (done) => {
    /*const signInMethod = spyOn(fireAuthService, 'signInWithEmailAndPassword');
    signInMethod.and.returnValue(Promise.resolve({
      credential: null,
      user: null,
    }));

    service.login('test@mail.de', 'test123').then((data) => {
      expect(signInMethod).toHaveBeenCalled();
    });*/

    service.login(userCreds.email, userCreds.password).then(
      result => {
        expect(result).toBeTrue()
      }
    );

  });
});
