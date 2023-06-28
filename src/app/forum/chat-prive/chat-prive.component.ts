import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ChatService} from '../../service/chat.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Subscription} from 'rxjs';
import {ForumService} from '../../service/forum.service';
import {Chatroom} from '../../models/chatroom';
import {Message} from '../../models/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss']
})
export class ChatPriveComponent implements OnInit {

  // Holding the chat messages
  private routeSub: Subscription;
  //mess: Message = new Message();
  chhh: Chatroom[];
  ch: Chatroom = new Chatroom();
  chatLists: Chatroom[];
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  users: User[];
  map: Map<number, Chatroom> = new Map();
  map2: Map<number, string> = new Map();
  map3: Map<number, string> = new Map();


  constructor(private router: Router, public chatService: ChatService, private service: ForumService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.routeSub = this.service.getchatroom('1', '2').subscribe(res => {
      console.log(res);
      this.ch = res;
    });
    this.routeSub = this.service.GetAllUser().subscribe(res => {
      console.log(res);
      this.users = res;
    });
    this.username = this.currentUser.username;
    this.allchat();
    this.ch.color = '#EC407A';
    this.map.set(this.currentUser.userId, this.ch);
    this.map2.set(this.currentUser.userId, 'Start Chat');
    this.map3.set(this.currentUser.userId, 'profile_user.jpg');

  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      text: this.messages,
      avatar: avatar,
      username: this.username,
      idchat: this.map.get(this.currentUser.userId).chatroomId.toString(),
      sender: this.currentUser.userId.toString()

    };

    this.chatService.sendMessage(obj);
  }

  ref(id1: string, id2: string, xx: string, yy) {
    this.routeSub = this.service.getchatroom(id1, id2).subscribe(res => {
      console.log(res);
      this.ch = res;
      this.map.set(this.currentUser.userId, this.ch);
      this.map2.set(this.currentUser.userId, xx);
      this.map3.set(this.currentUser.userId, yy);
      console.log(this.chatLists[res.chatroomId]);
      console.log(this.currentUser.userId);
    });
  }

  // send(id: string){
  //   this.routeSub = this.service.sendmsg(this.ch.chatroomId.toString() , this.mess).subscribe(res => {
  //     console.log(res);
  //     this.allchat();
  //   });
  // }

  allchat() {
    this.routeSub = this.service.allchat().subscribe(res => {
      this.chhh = res;
      console.log(res);

    });
  }

  color(id: string, c: string) {
    this.service.color(id, c).subscribe(p => {
      console.log();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
}
