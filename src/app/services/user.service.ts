import { Injectable } from '@angular/core';
import {UserCargo} from "../models/UserCargo";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<UserCargo>;
  private users: UserCargo[] = [];

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<UserCargo>('Users');
  }

  async addUser(user: UserCargo) {
    console.log("Der User in addUser(user: UserCargo): " + user)
    const user1 = this.copyAndPrepareUser(user);
    console.log("Der User nach copyAndPrepareUser(): " + user1)
    await this.userCollection.add(user1).then().catch((err)=>{console.log(err)});
  }

  async updateUser(user: UserCargo) {
    await this.userCollection.doc(user.id).update(user)
  }

  async deleteUser(user: UserCargo) {
    await this.userCollection.doc(user.id).delete();
  }

  copyAndPrepareUser(user: UserCargo): UserCargo {
    return {...user};
  }
}
