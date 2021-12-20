import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Car} from "../models/Car";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private carCollection: AngularFirestoreCollection<Car>;

  constructor(private afs: AngularFirestore) {
    this.carCollection = afs.collection<Car>('Cars');
  }

  copyAndPrepareCar(car: Car): Car {
    return {...car};
  }

  async addCar(car: Car): Promise<string> {
    return this.carCollection.add(this.copyAndPrepareCar(car))
      .then((doc) => {
        return doc.id;
      })
  }

  async deleteCar(id: string) {
    this.carCollection.doc(id).delete()
      .catch((e) => console.log(e));
  }

  async getCarById(id: string) {
    return this.carCollection.doc(id).get().toPromise()
      .then(doc => {
        if (doc.exists) {
          const car: Car | undefined = doc.data();
          if (car != undefined) {
            car.id = doc.id;
            return car;
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
  }

}
