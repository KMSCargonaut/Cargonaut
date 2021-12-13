import {Injectable, Predicate} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Tour} from "../models/Tour";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private tourCollection: AngularFirestoreCollection<Tour>;

  constructor(private afs: AngularFirestore) {
    this.tourCollection = afs.collection<Tour>('Tours');
  }

  copyAndPrepareTour(tour: Tour): Tour {
    return {...tour};
  }

  async addTour(tour: Tour) {
    this.tourCollection.add(this.copyAndPrepareTour(tour))
      .then(() => console.log('tour added'))
      .catch((err) => console.log(err));
  }

  async deleteTour(tour: Tour) {
    this.tourCollection.doc(tour.id).delete()
      .then(() => console.log('tour deleted'))
      .catch((err) => console.log(err));
  }

  async updateTour(tour: Tour) {
    this.tourCollection.doc(tour.id).update(tour)
      .then(() => console.log('tour updated'))
      .catch((err) => console.log(err))
  }

  async getFiltleredTours(predicate: Predicate<Tour>): Promise<Tour[]> {
    let tempCollection: Observable<Tour[]> = this.afs.collection<Tour>('Tours').valueChanges({idField: 'id'});
    let tempTours: Tour[] = [];
    tempCollection.toPromise().then(snapshot => {
      snapshot.map(tour => {
        tempTours.push(tour);
      })
    })
    console.log('Tours[]: ', tempTours);
    return tempTours.filter(predicate);
  }
}
