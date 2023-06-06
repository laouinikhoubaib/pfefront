import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post.model';
import {ForumService} from '../service/forum.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {PostLike} from '../models/postLike.model';
import {PostComment} from '../models/postComment.model';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  menuItems: MenuItem[];
  listPost: Post[];
  xl: number;
  fileToUpload: File | null = null;

  listComments: Comment[];
  post: Post;
  postLike: PostLike = new PostLike();
  private routeSub: Subscription;
  comment: PostComment = new PostComment();
  comment1: PostComment = new PostComment();
  comment2: PostComment = new PostComment();
  post1: Post = new Post();
  image!: File;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  currentUser: User = new User();
  aa: string;
  comm2: PostComment = new PostComment();
  post2: Post = new Post();
  errorMessage: string = "";
  errorComment: string = "";
  commenttest: string = "";
  term: string;
  imagenMin: File;

  constructor(private router: Router, private service: ForumService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });
    this.comm2.user = this.currentUser;

  }

  getPostComment(id: string): void {
    this.service.getComments(id).subscribe(ress => {
      console.log(ress);
      this.listComments = ress;
    });
  }

  addLikePost(id: string) {
    this.service.addPostLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      this.routeSub = this.service.getPosts().subscribe(res => {
        console.log(res);
        this.listPost = res;
      });
    });
  }

  addDisLikePost(id: string) {
    this.service.addPostDisLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      this.routeSub = this.service.getPosts().subscribe(res => {
        console.log(res);
        this.listPost = res;
      });
    });
  }

  addComment(id: string) {
    this.service.addCommentPst(id, this.comment).subscribe(data => {
          this.routeSub = this.service.getPosts().subscribe(res => {
            console.log(res);
            this.listPost = res;
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorComment = 'Mauvais mot utilisé';
          } else if (err?.status === 400) {
            this.errorComment = 'Adresse e-mail existe déjà';
          }
        }
    );
  }

  addCommentReply(id: string) {
    this.service.addCommentReply(id, this.comment1).subscribe(p => {
      console.log(this.comment1);
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }


  Like_Dislike(id: string) {
    this.service.Like_Dislike(id).subscribe(p => {
      console.log(this.comment);
      this.xl = p;
    });


  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  deletePost(id: string) {
    this.service.DeletePost(id).subscribe(p => {
      console.log('delete');
        this.router.navigate(['user/forum']).then(() => {
          window.location.reload();
        });
    });
    this.router.navigate(['user/forum']).then(() => {
      window.location.reload();
    });
  }

  deleteCom(id: string) {
    this.service.DeleteCom(id).subscribe(p => {
      console.log('delete');

    });
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });

  }

  openPostDetails(id: string): void {
    this.router.navigate(['user/post-detais', id]);
  }

  openCom(cc: PostComment): void {
    this.comm2 = cc;
  }

  openPost(cc: Post): void {
    this.post2 = cc;
  }

  openPostdel(cc: Post): void {
    this.post2 = cc;
  }

  UpdateComm(id: string) {
    this.service.UpdateCom(id, this.comment2).subscribe(p => {
      console.log(this.comment2);
      this.routeSub = this.service.getPosts().subscribe(res => {
        console.log(res);
        this.listPost = res;
      });
    });
  }

  UpdatePost(id: string) {
    if (this.post1.body === '') {
      this.post1.body = this.post2.body;
    }
    this.service.UpdatePost(id, this.post1).subscribe(data => {
          this.router.navigate(['/user/forum']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Mauvais mot utilisé';
          } else if (err?.status === 400) {
            this.errorMessage = 'Adresse e-mail existe déjà';
          }
        }
    );
  }

  ratePost(id: string, x: string) {
    this.service.ratePost(id, x).subscribe(p => {
      console.log(this.post1);
      this.routeSub = this.service.getPosts().subscribe(res => {
        console.log(res);
        this.listPost = res;
      });
    });
  }

  reportPost(id: string) {
    this.service.reportPost(id).subscribe(p => {
      console.log("reporte");
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }


  onFileSelcted(event: any){
    this.fileToUpload = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.fileToUpload);
  }
  onSaveFile() {
    const formData = new FormData();
    formData.append('image', this.fileToUpload);
    // @ts-ignore
    formData.append('reportProgress', true);
    return this.service.postFile(this.post2.postId.toString(), this.fileToUpload).subscribe(p => {
          this.router.navigate(['user/forum']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Mauvais mot utilisé dans votre photo';
          } else if (err?.status === 404) {
            this.errorMessage = 'Mauvais mot utilisé';
          } else if (err?.status === 200) {
            this.router.navigate(['user/forum']).then(() => {
              window.location.reload();
            });
          }
        });
  }

}
