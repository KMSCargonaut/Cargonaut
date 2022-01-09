import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/Post";
import {Tour} from "../../../models/Tour";
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnChanges{

  posts: Observable<Post[]> | undefined;
  @Input() tour: Tour | null = null;

  constructor(public postService: PostService, public userService: UserService) {
  }

  async ngOnChanges(changes: SimpleChanges){
    this.tour = changes.tour.currentValue;
    console.log(this.tour);
    if(this.tour?.dID){
      this.posts = await this.postService.getObservablePost(this.tour.dID)
      console.log(this.posts)
    }
  }

  async addPost(message: string) {
    if(this.tour?.dID && this.userService.currUser?.uid && message.trim().length > 0){
      await this.postService.addPost(new Post(this.userService.currUser.uid, this.tour.dID, message, new Date().getTime()));
    }
  }


  async updatePosts() {
    const posts = await this.postService.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
      posts[i].author = `Autor${i}`;
      posts[i].tourID = `Tour${i}`;
      posts[i].message = `Ich bin ein Test${i}`;
      console.log(posts[i])
      await this.postService.update(posts[i]);
    }
    console.log('Update: ', posts)
  }

  async deletePost() {
    const posts = await this.postService.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
      await this.postService.deletePost(posts[i]);
    }
  }

}
