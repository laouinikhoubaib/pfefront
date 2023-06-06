import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {PostLike} from '../models/postLike.model';
import {PostComment} from '../models/postComment.model';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';
import {Chatroom} from '../models/chatroom';
import {User} from '../models/user.model';
import {Message} from '../models/mess';

@Injectable({
  providedIn: 'root'
})
export class ForumService extends  RequestBaseService{
  ForumUrl = 'http://localhost:8080/SpringMVC/forum/Get-all-Post';
  aa = 'http://localhost:8080/SpringMVC/forum/add-Post-image/';


  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);

  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ForumUrl, {headers: this.getHeaders});
  }


  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8080/SpringMVC/forum/Get-Post-Comments/' + id, {headers: this.getHeaders});
  }

  addPost(post: Post) {
    return this.http.post<Post>('http://localhost:8080/SpringMVC/forum/add-Post/1', post, {headers: this.getHeaders});
  }

  addPostLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8080/SpringMVC/forum/add-Like-post/' + id + '/1', postLike, {headers: this.getHeaders});
  }

  addPostDisLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8080/SpringMVC/forum/add-DisLike-post/' + id + '/1', postLike, {headers: this.getHeaders});
  }

  addCommentPst(idPost: string, postComment: PostComment) {
    return this.http.post<Comment>('http://localhost:8080/SpringMVC/forum/add-Comment/' + idPost + '/1', postComment, {headers: this.getHeaders});
  }
  addCommentReply(idComm: string, postComment: PostComment) {
    return this.http.post<Comment>('http://localhost:8080/SpringMVC/forum/add-Com-to-Com/' + idComm + '/1', postComment, {headers: this.getHeaders});
  }

  DeletePost(idPost: string) {
    return this.http.delete<Post>('http://localhost:8080/SpringMVC/forum/Delete-Post/' + idPost , {headers: this.getHeaders});

  }

  DeleteCom(idCom: string) {
    return this.http.delete<PostComment>('http://localhost:8080/SpringMVC/forum/Delete-PostComment/' + idCom , {headers: this.getHeaders});

  }
  UpdateCom(idCom: string , c: PostComment) {
    return this.http.put<PostComment>('http://localhost:8080/SpringMVC/forum/Update-Comment/' + idCom + '/' , c , {headers: this.getHeaders});

  }
    UpdatePost(idCom: string , c: Post) {
      return this.http.put<PostComment>('http://localhost:8080/SpringMVC/forum/Update-Post/' + idCom + '/' , c , {headers: this.getHeaders});

    }
  addImagePost(idPost: string, image: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', image);

    return this.http.post('localhost:8080/SpringMVC/forum/add-Post-image/' + idPost, data , {headers: this.getHeaders});
  }


  Like_Dislike(idPost: string): Observable<number> {

    return this.http.get<number>('http://localhost:8080/SpringMVC/forum/get-user-islike-post/' + idPost, {headers: this.getHeaders});
  }

  getpostByiD(id: string): Observable<Post>{
    return this.http.get<Post>('http://localhost:8080/SpringMVC/forum/Get-Post-Details/' + id , {headers: this.getHeaders});
  }

  ratePost(idp: string , x: string) {
    return this.http.put<PostComment>('http://localhost:8080/SpringMVC/forum/Give-post-etoile/' + idp + '/'  + x , {headers: this.getHeaders});

  }

  reportPost(idp: string ) {
    return this.http.get<any>('http://localhost:8080/SpringMVC/forum/Report-Post/' + idp , {headers: this.getHeaders});

  }

  getchatroom(ids: string , idr: string ) {
    return this.http.get<Chatroom>('http://localhost:8080/SpringMVC/chat/Chatroom/' + ids + '/' + idr , {headers: this.getHeaders});

  }

  GetAllUser() {
    return this.http.get<User[]>('http://localhost:8080/SpringMVC/chat/ListUser/', {headers: this.getHeaders});

  }
  sendmsg(id: string, m: Message) {
    return this.http.post<Message>('http://localhost:8080/SpringMVC/chat/send/' + id, m , {headers: this.getHeaders});

  }

  allchat() {
    return this.http.get<Chatroom[]>('http://localhost:8080/SpringMVC/chat/allchat' , {headers: this.getHeaders});

  }
  color(id: string , c: string) {
    return this.http.post<string>('http://localhost:8080/SpringMVC/chat/color/' + id , c , {headers: this.getHeaders});

  }

  image(file: File, id: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('Image', file);
    const req = new HttpRequest('POST', 'localhost:8080/SpringMVC/forum/add-Post-image/' + id , formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  postFile(courseId: string, file: File) {
    const formParams = new FormData();
    // @ts-ignore
    formParams.append('image', file);
    const options: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    return this.http.post('http://localhost:8080/SpringMVC/forum/add-Post-image/' + courseId, formParams );
  }

}
