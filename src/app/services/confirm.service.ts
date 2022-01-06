import { Injectable } from '@angular/core';
import {Confirm} from "../models/Confirm";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  confirmCollection: AngularFirestoreCollection<Confirm>;
  constructor(private afs: AngularFirestore) {
    this.confirmCollection = afs.collection<Confirm>('Confirm');
  }

  copyAndPrepareConfirm(confirm: Confirm) {
    return {...confirm};
  }

  async addConfirm(confirm: Confirm) {
   await this.confirmCollection.add(this.copyAndPrepareConfirm(confirm));
  }

  async updateConfirm(confirm: Confirm) {
    await this.confirmCollection.doc(confirm.dId).update(this.copyAndPrepareConfirm(confirm));
  }

  async getConfirmById(id: string) {
    return this.confirmCollection.doc(id).get().toPromise().then((doc) => {
      if (doc.exists) {
        const confirm: Confirm | undefined = doc.data();
        if (confirm != undefined) {
          confirm.dId = doc.id;
          return confirm;
        } else return null;
      } else return null;
    })
  }

  async findConfirmationByTourId(id: string) {
    return this.afs.collection<Confirm>('Confirm', ref =>
    ref.where('tourId', '==', id)
    ).get().toPromise().then(snapshot =>
    snapshot.docs.map(doc => {
      const confirm: Confirm = doc.data();
      confirm.dId = doc.id;
      return confirm;
    }))
  }
}
