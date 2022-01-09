import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = afs.collection<Post>('Posts');
  }

  private static copyAndPreparePost(post: Post): Post {
    delete post.dId;
    return {...post};
  }

  public async addPost(post: Post) {
    await this.postCollection.add(PostService.copyAndPreparePost(post));
  }

  public async deletePost(post: Post) {
    await this.postCollection.doc(post.dId).delete();
  }

  public async update(post: Post) {
    await this.postCollection.doc(post.dId).update(PostService.copyAndPreparePost(post));
  }

  public async getAllPosts() {
    return this.postCollection.get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const post: Post = doc.data();
        post.dId = doc.id;
        return post;
      }))
  }

  public async getPostsByTourId(tourId: string) {
    return this.afs.collection<Post>('Posts', ref =>
      ref.where('tourID', '==', tourId)).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const post: Post = doc.data();
        post.dId = doc.id;
        return post;
      }))
  }

  public async getPostByAuthor(uid: string) {
    return this.afs.collection<Post>('Posts', ref =>
      ref.where('author', '==', uid)).get().toPromise().then(snapshot =>
      snapshot.docs.map(doc => {
        const post: Post = doc.data();
        post.dId = doc.id;
        return post;
      }))
  }

  public async getObservablePost(tourID: string){
    return this.afs.collection<Post>('Posts', ref =>
    ref.where('tourID', '==', tourID)
      .orderBy('sendDate', 'desc')
    ).valueChanges({
      idField: 'dId'
    });
  }

}
