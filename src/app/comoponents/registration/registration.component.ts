import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {getAuth} from "firebase/auth";
import {UserCargo} from "../../models/UserCargo";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  // ModelBinding
  public email = '';
  public firstname = '';
  public lastname = '';
  public username = '';
  public birthday: Date | null | undefined;
  public password = '';
  public repeatPassword = '';
  public gender = '';

  // PropertyBinding for outline color for wrong/no inputs
  public wrongEmailClass = '';
  public wrongFirstname = '';
  public wrongLastname = '';
  public wrongUsername = '';
  public wrongBirthday = '';
  public wrongGender = '';
  public wrongPasswordClass = '';
  public wrongRepeatPasswordClass = '';

  // Message for wrong/no inputs
  public emailMessage = '';
  public firstnameMessage = '';
  public lastnameMessage = '';
  public usernameMessage = '';
  public birthdayMessage = '';
  public genderMessage = '';
  public passwordMessage = '';
  public passwordRepeatMessage = '';


  constructor(public activeModal: NgbActiveModal, private router: Router,
              private userData: UserService) {}


  private async register() {
    try {
      await this.userData.register(this.email, this.password);
      const tempAuth = getAuth();
      const tempUser = tempAuth.currentUser;
      this.activeModal.close();
      this.router.navigate(['/profil'])
      if (tempUser) {
        await this.userData.addUser(
          new UserCargo(tempUser.uid, this.firstname, this.lastname, this.username, this.birthday, this.gender)
        );
      }

    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        this.emailMessage = 'E-Mail ist nicht richtig formatiert';
        this.wrongEmailClass = 'border-danger';
      } else if (err.code === 'auth/weak-password') {
        this.passwordMessage = 'Das Passwort ist nicht korrekt';
        this.wrongPasswordClass = 'border-danger';
      }
    }
  }

  public async inputCheck() {
    if (this.email.trim().length > 0 &&
      this.password.trim().length > 0 &&
      this.firstname.trim().length > 0 &&
      this.lastname.trim().length > 0 &&
      this.gender.trim().length > 0 &&
      this.username.trim().length > 0 &&
      this.birthday != undefined &&
      this.birthday.toISOString().trim().length > 0 &&
      this.password === this.repeatPassword) {
      await this.register()
    } else {
      if (this.email.trim().length === 0) {
        this.emailMessage = 'Geben Sie Ihre E-Mail an';
        this.wrongEmailClass = 'border-danger';
      }
      if (this.password.trim().length === 0) {
        this.passwordMessage = 'Geben Sie ein Passwort an';
        this.wrongPasswordClass = 'border-danger';
      }
      if (this.repeatPassword.trim().length === 0) {
        this.passwordRepeatMessage = 'Wiederholen Sie Ihr Passwort';
        this.wrongRepeatPasswordClass = 'border-danger';
      }
      if (this.repeatPassword !== this.password) {
        this.passwordRepeatMessage = 'Die Passwörter sind nicht identisch';
        this.wrongRepeatPasswordClass = 'border-danger';
      }
      if (this.firstname.trim().length === 0) {
        this.firstnameMessage = 'Geben Sie Ihren Vornamen an';
        this.wrongFirstname = 'border-danger';
      }
      if (this.lastname.trim().length === 0) {
        this.lastnameMessage = 'Geben Sie Ihren Nachnamen an';
        this.wrongLastname = 'border-danger';
      }
      if (this.username.trim().length === 0) {
        this.usernameMessage = 'Geben Sie einen Nutzername an';
        this.wrongUsername = 'border-danger';
      }
      if (this.gender.trim().length === 0) {
        this.genderMessage = 'Geben Sie Ihr Geschlecht an';
        this.wrongGender = 'border-danger';
      }
      if (this.birthday === undefined) {
        this.birthdayMessage = 'Geben Sie Ihren Geburtstag an';
        this.wrongBirthday = 'border-danger';
      }
    }
  }

  public validEmail(input: string): void {
    if (input.trim().length >= 0) {
      this.emailMessage = '';
      this.wrongEmailClass = '';
    }
  }


  public validFirstname(input: string): void {
    if (input.trim().length >= 0) {
      this.firstnameMessage = '';
      this.wrongFirstname = '';
    }
  }

  public validLastname(input: string): void {
    if (input.trim().length >= 0) {
      this.lastnameMessage = '';
      this.wrongLastname = '';
    }
  }

  public validUsername(input: string): void {
    if (input.trim().length >= 0) {
      this.usernameMessage = '';
      this.wrongUsername = '';
    }
  }

  public validBirthday(input: string): void {
    console.log(input)
    if (input.trim().length >= 0) {
      this.birthdayMessage = '';
      this.wrongBirthday = '';
    }
  }

  public validPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordMessage = '';
      this.wrongPasswordClass = '';
    }
  }

  public validGender(input: string) {
    console.log(input)
    if (input.trim().length >= 0) {
      this.genderMessage = '';
      this.wrongGender = '';
    }
  }

  public validRepeatPassword(input: string): void {
    if (input.trim().length >= 0) {
      this.passwordRepeatMessage = '';
      this.wrongRepeatPasswordClass = '';
    }
  }


}
