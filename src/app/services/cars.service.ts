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
        console.log('car added: ', doc.id)
        return doc.id;
      })
  }

  async deleteCar(id: string) {
    this.carCollection.doc(id).delete()
      .then(() => console.log('car deleted'))
      .catch((e) => console.log(e));
  }

  private async getAllCars(): Promise<Car[]> {
    return this.afs.collection<Car>('Cars').get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const car: Car = doc.data();
        car.id = doc.id;
        return car;
      }))
  }

 /* public async getCarsFromUser(uid: string) {
    const cars = [];
    const user = await this.userData.getUser(uid);
    if (user) {
      if (user.car.length > 0) {
        for (const tempCar of user.car) {
          cars.push(this.getCarById(tempCar))
        }
      }
    }
    return cars;
  }*/

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
