import {Car} from "./Car";
import {Gender} from "./Gender";

export class UserCargo {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: Date;
  evaluation: number | null | undefined;
  car: Car | undefined;
  money: number | null | undefined;
  gender: Gender;


  constructor(id: string, firstname: string, lastname: string, username: string, birthday: Date, gender: Gender) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.birthday = birthday;
    this.gender = gender;
  }
}
