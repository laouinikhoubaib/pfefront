import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';


declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class ChatService extends  RequestBaseService{

  public messages = [];
  public stompClient;

  constructor(authenticationService: AuthenticationService, http: HttpClient , ) {
  super(authenticationService, http);
  this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/SpringMVC/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat/messages', message => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar , obj.sender, obj.chatid );
        }
      });
      that.stompClient.subscribe('/user/chat/private-messages', message => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar, obj.sender , obj.chatid);
        }
      });
    });
  }

  addMessage(message: any, username: string, avatar: string , chatid: string , sender: string) {
    this.messages.push({
      text: message,
      date: new Date(),
      user: {
        name: username,
        avatar: avatar
      },
      chatid: chatid,
      sender: sender


    });
  }

  sendMessage(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  sendMessagep(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }

}
