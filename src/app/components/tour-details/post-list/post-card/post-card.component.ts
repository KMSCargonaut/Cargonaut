import {Component, Input} from '@angular/core';
import {PostService} from "../../../../services/post.service";
import {Post} from "../../../../models/Post";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent{

  @Input() post: Post = new Post('', '', '', '');

  constructor(public postService: PostService) {

  }

}
