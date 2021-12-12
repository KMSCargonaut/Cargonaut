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
    const tempUser = this.copyAndPrepareUser(user);
    await this.userCollection.add(tempUser).then().catch((err)=>{console.log(err)});
  }

  async updateUser(user: UserCargo) {
    const tempUser = this.copyAndPrepareUser(user);
    await this.userCollection.doc(user.id).update(tempUser);
  }

  async deleteUser(user: UserCargo) {
    await this.userCollection.doc(user.id).delete();
  }

  copyAndPrepareUser(user: UserCargo): UserCargo {
    return {...user};
  }
}
