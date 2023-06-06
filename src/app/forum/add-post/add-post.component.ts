import { Component, OnInit } from '@angular/core';
import {ForumService} from '../../service/forum.service';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: Post = new Post();
  errorMessage: string = 'null';
  fileToUpload: File | null = null;
  imagenMin: File;

  constructor(private cs: ForumService, private router: Router) {
  }

  addPost() {
    this.cs.addPost(this.post).subscribe(() => this.router.navigateByUrl('/forum'));
    this.cs.addPost(this.post).subscribe(() => this.router.navigateByUrl('/eventFront'));
    console.log(this.post.postTitle);
  }

  ngOnInit(): void {
  }

  addnewpost() {
    this.cs.addPost(this.post).subscribe(data => {
      this.post = data ,
          console.log(data);
          this.errorMessage = 'valide'; },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Mauvais mot utilisé';
          } else if (err?.status === 400) {
            this.errorMessage = 'Email existe déjà';
          }
        }

        );
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
    return this.cs.postFile(this.post.postId.toString(), this.fileToUpload).subscribe(p => {
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Mauvais mot utilisé dans votre photo';
          } else if (err?.status === 404) {
            this.errorMessage = 'Bad Word used';
          } else if (err?.status === 200) {
            this.router.navigate(['user/forum']).then(() => {
              window.location.reload();
            });
          }
        });
  }

}

