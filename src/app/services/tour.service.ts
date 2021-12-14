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
    this.tourCollection.doc(tour.dID).delete()
      .then(() => console.log('tour deleted'))
      .catch((err) => console.log(err));
  }

  async updateTour(tour: Tour) {
    this.tourCollection.doc(tour.dID).update(tour)
      .then(() => console.log('tour updated'))
      .catch((err) => console.log(err))
  }

// Angebote
  async searchTours(offer: boolean, startCity: string, endCity: string, date: string, storage: number, seats: number): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('offer', '==', offer)
        .where('booked', '==', false)
        .where('startCity', '==', startCity)
        .where('endCity', '==', endCity)
        .where('storage', '>=', storage)
        .orderBy('storage', "asc")

    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour
      })).then(tours => {
        return tours.filter(tour => tour.seats >= seats)
    })
  }

  sortPrice(tours: Tour[]): Tour[] {
    return tours.sort((a, b) => this.compare(a.price, b.price));
  }

  sortEva(tours: Tour []): Tour[] {
    return tours.sort((a, b) => this.compare(a.price, b.price));
  }

  sortStorage(tours: Tour[]): Tour[] {
    return tours.sort((a, b) => this.compare(a.price, b.price));
  }

  sortSeats(tours: Tour[]): Tour[] {
    return tours.sort((a, b) => this.compare(a.price, b.price));
  }

  compare(a: number, b: number): number {
    return (a == b) ? 0 : (a > b) ?  1 :  -1;
  }

  /*
  meherere wheres usw gehen nicht. Man kann damit die queries limitieren (am besten tatsächlich ein Limit setzten) und dann im client filtern
   außerdem kann man ein button hinzufügen, der dann weitere 10, 20, 30, .. tours lädt in abhängigkeit von dem letzen natürlich
*/


  /* async getFiltleredTours(predicate: Predicate<Tour>): Promise<Tour[]> {
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

   async getAllTours(): Promise<Tour[]> {
     return this.tourCollection.get().toPromise().then(snapshot =>
       snapshot.docs.map(doc => {
         let temp = doc.data();
         temp.id = doc.id;
         return temp;
       }))
   }

   async test(desc: string) {
     return this.afs.collection<Tour>('Tours', ref => ref.where('descr', '==', desc))
       .get().toPromise().then(snapshot =>
         snapshot.docs.map(doc => {
           let temp = doc.data();
           temp.id = doc.id;
           return temp;
         }))
   }

   async test1(desc: string, id: string) {
     return this.afs.collection<Tour>('Tours', ref => ref.where('descr', '==', desc))
       .doc(id).get().toPromise().then(doc => {
         let temp = doc.data();
         if (temp) {
           temp.id = doc.id;
         }
         return temp;
       })
   }
 */


}
