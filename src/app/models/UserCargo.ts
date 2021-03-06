export class UserCargo {
  dId?: string;
  uid: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: Date;
  evaluation: number;
  evaluationCounter: number;
  car: string[];
  money: number;
  gender: string;


  constructor(uid: string, firstname: string, lastname: string, username: string, birthday: Date, gender: string) {
    this.uid = uid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.birthday = birthday;
    this.gender = gender;
    this.car = [];
    this.money = 0;
    this.evaluation = -1; //nicht vorhanden
    this.evaluationCounter = 0;

  }
}
