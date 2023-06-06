import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Post} from '../../models/post.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ForumService} from '../../service/forum.service';


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  menuItems: MenuItem[];
  listPost: Post[];
  listComments: Comment[];
  post: Post;
  comment: Comment;
  id: string;
  private routeSub: Subscription;
  constructor(private router: Router, private service: ForumService) {
  }

  ngOnInit(): void {
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });

  }
  getPostComment(id: string): void{
    this.service.getComments(this.id).subscribe(ress => {
      console.log(ress);
      this.listComments = ress;
    });
  }
}
