import {Injectable, Predicate} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Tour} from "../models/Tour";


@Injectable({
  providedIn: 'root'
})
export class TourService {

  private tourCollection: AngularFirestoreCollection<Tour>;
  public tourDetails: Tour|null = null;

  constructor(private afs: AngularFirestore) {
    this.tourCollection = afs.collection<Tour>('Tours');
  }

  copyAndPrepareTour(tour: Tour): Tour {
    return {...tour};
  }

  async addTour(tour: Tour) {
    this.tourCollection.add(this.copyAndPrepareTour(tour))
      .catch((err) => console.log(err));
  }

  async deleteTour(tour: Tour) {
    this.tourCollection.doc(tour.dID).delete()
      .catch((err) => console.log(err));
  }

  async updateTour(tour: Tour) {
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

  async getAllOpenToursFromUser(uid: string): Promise<Tour[]> {
    let driverTours = await this.getAllToursAsDriverFromUser(uid, false);
    let passengerTours = await this.getAllToursAsPassengerFromUser(uid, false);
    return driverTours.concat(passengerTours);
  }

  async getAllBookedToursFromUser(uid: string): Promise<Tour[]> {
    let driverTours = await this.getAllToursAsDriverFromUser(uid, true);
    let passengerTours = await this.getAllToursAsPassengerFromUser(uid, true);
    return driverTours.concat(passengerTours);
  }


  private async getAllToursAsDriverFromUser(uid: string, isBooked: boolean): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('driver', '==', uid)
        .where('booked', '==', isBooked)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }

   /**  ACHTUNG! Eventuell wird das so nicht funktionieren, da passenger ein Array ist! **/

  private async getAllToursAsPassengerFromUser(uid: string, isBooked: boolean): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('passengers', '==', [uid])
        .where('booked', '==', isBooked)
    ).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const tour: Tour = doc.data();
        tour.dID = doc.id;
        return tour;
      }))
  }


// Suchen von Tours
  async searchTours(offer: boolean, startCity: string, endCity: string, date: string, storage: number, seats: number): Promise<Tour[]> {
    return this.afs.collection<Tour>('Tours', ref =>
      ref
        .where('offer', '==', offer)
        .where('booked', '==', false)
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
