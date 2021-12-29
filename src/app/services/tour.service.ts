import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Tour} from "../models/Tour";
import {Passenger} from "../models/Passenger";


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

  copyAndPreparePassenger(passenger: Passenger): Passenger {
    return {...passenger};
  }

  async addTour(tour: Tour) {
    for (let i = 0; i < tour.passengers.length; i++) {
      tour.passengers[i] = this.copyAndPreparePassenger(tour.passengers[i]);
    }
    this.tourCollection.add(this.copyAndPrepareTour(tour))
      .catch((err) => console.log(err));
  }

  async deleteTour(tour: Tour) {
    this.tourCollection.doc(tour.dID).delete()
      .catch((err) => console.log(err));
  }

  async updateTour(tour: Tour) {
    for (let i = 0; i < tour.passengers.length; i++) {
      tour.passengers[i] = this.copyAndPreparePassenger(tour.passengers[i]);
    }
    this.tourCollection.doc(tour.dID).update(tour)
      .catch((err) => console.log(err))
  }

  async getAllTours(): Promise<Tour[]> {
    return this.tourCollection.get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour
      }))
  }

  async getAllBookedTours() {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('isBooked', '==', true)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }

  async getAllToursFromUser(uid: string): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('creatorID', '==', uid)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }

  async getAllOffers(): Promise<Tour[]>{
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('isOffer', '==', true)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }

  async getAllRequests(): Promise<Tour[]>{
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('isOffer', '==', false)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }


/**
 *  Eventuell veraltelt
 **/

// Suchen von Tours
  async searchTours(/*offer: boolean,*/ startCity: string, endCity: string, date: string, storage: number, seats: number): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        /*.where('isOffer', '==', offer)*/
        .where('isBooked', '==', false)
        .where('date', '==', date)
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
    return (a == b) ? 0 : (a > b) ? 1 : -1;
  }

}
