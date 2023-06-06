import { Component, OnInit, Input } from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {Message} from '../../models/message';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  m: string;
  a: string;
  @Input('m')
  set setsender(value: string) {
    this.m = value;
  }
  @Input('a')
  set setreciver(value: string) {
    this.a = value;
  }


  constructor(public chatService: ChatService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }
  ngOnInit(): void {
    this.username = this.currentUser.username;
    console.log(this.a, this.m);
  }

  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      text: this.messages,
      avatar: avatar,
      username: this.username,
      sender: '0',
      idchat: '0'
    };
    console.log(this.a, this.m);

    this.chatService.sendMessage(obj);
  }
}
