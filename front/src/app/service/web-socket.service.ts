import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Message} from "../interface/message";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient:any;
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: Message) => {
        let messageContent;
        messageContent = JSON.parse(messages.body);
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(messageContent);

        this.messageSubject.next(currentMessages);
      });
    });
  }

  sendMessage(message: Message, roomId: string) {
    console.log('Message received in sendMessage from WebSocketService, check message : ', message);
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

}
