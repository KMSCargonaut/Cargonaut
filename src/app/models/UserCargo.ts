import {Car} from "./Car";

export class UserCargo {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  birthday: Date | undefined;
  evaluation: number | null | undefined;
  car: Car[] | undefined;
  money: number | null | undefined;
  gender: string | undefined;


  constructor(id?: string, firstname?: string, lastname?: string, username?: string, birthday?: Date, gender?: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.birthday = birthday;
    this.gender = gender;
  }
}
