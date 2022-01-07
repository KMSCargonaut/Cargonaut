import { Component } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/Post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{

  constructor(public postService: PostService) {
    this.deletePost().then();
  }

  async addPost() {
    await this.postService.addPost( new Post('Autor', 'Tour', 'Ich bin ein Test', new Date().toString()));
  }

  async getPosts() {
    console.log('Get: ', await this.postService.getAllPosts());
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
