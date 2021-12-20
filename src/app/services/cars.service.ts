import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Car} from "../models/Car";
import {doc} from "@angular/fire/firestore";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private carCollection: AngularFirestoreCollection<Car>;

  constructor(private afs: AngularFirestore, private userData: UserService) {
    this.carCollection = afs.collection<Car>('Cars');
  }

  copyAndPrepareCar(car: Car): Car {
    return {...car};
  }

  async addCar(car: Car) {
    this.carCollection.add(this.copyAndPrepareCar(car))
      .then(() => console.log('car added'))
      .catch((e) => console.log(e));
  }

  async deletedCar(car: Car) {
    this.carCollection.doc(car.id).delete()
      .then(() => console.log('car deleted'))
      .catch((e) => console.log(e));
  }

  async getAllCarsFromUser(): Promise<Car[]> {
    return this.afs.collection<Car>('Cars').get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const car: Car = doc.data();
        car.id = doc.id;
        return car;
      }))
  }

  async getCarById(id: string) {
    return this.carCollection.doc(id).get().toPromise()
      .then(doc => {
          const car: Car = doc.data();
          car.id = doc.id;
          return car;
      })
  }

}
