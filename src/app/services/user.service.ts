import {Injectable} from '@angular/core';
import {UserCargo} from "../models/UserCargo";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import User = firebase.User;

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

  // User-Handler

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

  async getUser(uid: string): Promise<UserCargo | undefined> {
    return this.getAllUser().then(users => users.find(user => user.uid === uid))
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
    await this.userCollection.doc(user.dId).update(this.copyAndPrepareUser(user));
  }

  async deleteUser() {
    if (this.currUser) {
      await this.userCollection.doc(this.currUser.dId).delete();
    } else console.log('User not logged in')
  }

  copyAndPrepareUser(user: UserCargo): UserCargo {
    return {...user};
  }


  // Authentication

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async deleteAccount() {
    await firebase.auth().currentUser?.delete();
  }

  async register(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Car-Handler for User

  async deleteCar(id: string){
    if(this.currUser) {
      const index = this.currUser.car.indexOf(id,0);
      this.currUser.car.splice(index,1);
      await this.updateUser(this.currUser);
    }
  }

  async addCar(id: string) {
    if (this.currUser) {
      this.currUser.car.push(id);
      await this.updateUser(this.currUser)
    }
  }


  // Money Handling

  async addMoney(amount: number){
    if(this.currUser) {
      this.currUser.money += amount;
      await this.updateUser(this.currUser)
    }
  }


  async subMoney(amount: number){
    if(this.currUser) {
      this.currUser.money -= amount;
      await this.updateUser(this.currUser)
    }
  }
}
