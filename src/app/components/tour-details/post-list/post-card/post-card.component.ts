import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostService} from "../../../../services/post.service";
import {Post} from "../../../../models/Post";
import {UserService} from "../../../../services/user.service";
import {UserCargo} from "../../../../models/UserCargo";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnChanges{

  @Input() post: Post = new Post('', '', '', 0);
  user: UserCargo | undefined = new UserCargo('', '', '', '', new Date(), '');

  constructor(public postService: PostService, public userService: UserService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.user = await this.userService.getUser(changes.post.currentValue.author)
  }


}
