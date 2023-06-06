import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ForumService} from '../../service/forum.service';
import {Subscription} from 'rxjs';
import {RequestBaseService} from '../../service/request-base.service';
import {Post} from '../../models/post.model';
import {PostComment} from '../../models/postComment.model';
import {PostLike} from '../../models/postLike.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent extends RequestBaseService implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              authenticationService: AuthenticationService,
              private service: ForumService,
              private router: Router,
              http: HttpClient) {
    super(authenticationService, http);
  }
  comment: PostComment = new PostComment();
  comm2: PostComment = new PostComment();
  comment2: PostComment = new PostComment();
  postLike: PostLike = new PostLike();


  postid: string;
  routeSub: Subscription;
  post1: Post;
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.postid = params.id;
      this.getpostDetails(this.postid);
    });
  }
  getpostDetails(id: string): void {
    this.routeSub = this.service
        .getpostByiD(id)
        .subscribe(p => {
          this.post1 = p;
        });
  }
  addComment(id: string) {
    this.service.addCommentPst(id, this.comment).subscribe(p => {
      console.log(this.comment);
      this.getpostDetails(this.postid);
    });
  }
  addCommentReply(id: string) {
    this.service.addCommentReply(id, this.comment).subscribe(p => {
      console.log(this.comment);
      this.getpostDetails(this.postid);
    });
  }
  openCom(cc: PostComment): void {
    this.comm2 = cc;
  }

  UpdateComm(id: string) {
    this.service.UpdateCom(id, this.comment2).subscribe(p => {
      console.log(this.comment2);
      let currentUrl = this.router.url;

      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    });
  }
  deleteCom(id: string) {
    this.service.DeleteCom(id).subscribe(p => {
      console.log('delete');
      this.getpostDetails(this.postid);

    });
  }
  deletePost(id: string) {
    this.service.DeletePost(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['user/forum']).then(() => {
      window.location.reload();
    });

  }
  UpdatePost(id: string) {
    if (this.post1.body === ''){this.post1.body = this.post1.body; }
    this.service.UpdatePost(id, this.post1).subscribe(p => {
      console.log(this.post1);
      let currentUrl = this.router.url;

      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    });
  }
  addLikePost(id: string) {
    this.service.addPostLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
  addDisLikePost(id: string) {
    this.service.addPostDisLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
}
