import {Injectable} from '@angular/core';
import {UserCargo} from "../models/UserCargo";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import User = firebase.User;
import {Car} from "../models/Car";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<UserCargo>;
  public user: User | null = null;
  public currUser: UserCargo | null = null;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.userCollection = afs.collection<UserCargo>('Users');
    this.auth.user.subscribe(async (user) => {
      if (user) {
        await this.userExist(user);
      } else {
        await this.userNotExist();
      }
    })
  }

  async userExist(user: User) {
    this.user = user;
    const tempUser = await this.getUser(user.uid);
    if (tempUser) {
      this.currUser = tempUser;
      console.log("Cargo User: ", this.currUser)
      console.log('user still logged in')
    } else {
      await this.userNotExist()
    }
  }

  async userNotExist() {
    this.user = null;
    this.currUser = null;
    console.log('no User')
  }


  // User
  async getUser(id: string): Promise<UserCargo | undefined> {
    return this.getAllUser().then(users => users.find(user => user.uid === id))
  }

  async getAllUser(): Promise<UserCargo[]> {
    return this.userCollection.get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const user = doc.data();
        user.dId = doc.id;
        return user;
      })
    );
  }

  async addUser(user: UserCargo) {
    const tempUser = this.copyAndPrepareUser(user);
    await this.userCollection.add(tempUser).then().catch((err) => {
      console.log(err)
    });
  }

  async updateUser(user: UserCargo) {
    const tempUser = this.copyAndPrepareUser(user);
    let tempCar = [];
    for(let car of tempUser.car){
      tempCar.push(this.copyAndPrepareCar(car))
    }
    tempUser.car = tempCar;
    await this.userCollection.doc(user.dId).update(tempUser);
  }

  async deleteUser() {
    if (this.currUser) {
      await this.userCollection.doc(this.currUser.dId).delete();
    } else console.log('User not logged in')
  }

  copyAndPrepareUser(user: UserCargo): UserCargo {
    return {...user};
  }

  copyAndPrepareCar(car: Car): Car {
    return {...car}
  }


  // Authentication

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
    console.log('logged in');
  }

  async logout() {
    await this.auth.signOut();
    console.log('logged out');
  }

  async deleteAccount() {
    await firebase.auth().currentUser?.delete();
    console.log('deleted account');
  }

  async deleteCar(mark: string){
    if(this.currUser) {
      this.currUser.car = this.currUser.car.filter((item) => {
        console.log(item.mark !== mark);
        return item.mark !== mark
      });
      this.updateUser(this.currUser).then();
    }
  }

  async register(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    console.log('created account')
  }
}
