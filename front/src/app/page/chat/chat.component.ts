import {Component, OnInit} from '@angular/core';
import {Message} from "../../interface/message";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatFormField} from "@angular/material/form-field";
import {WebSocketService} from "../../service/web-socket.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    NgOptimizedImage,
    MatToolbarModule, MatButtonModule, MatIconModule, MatCard, MatCardContent, MatCardHeader, MatList, MatCardFooter, MatFormField, NgIf, MatListItem
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  refreshScroll() {
    setTimeout(() => {
      const mgs: any = document.getElementById("mgs");
      mgs.scrollTop = mgs.scrollHeight;
    }, 50);
  }

  messageInput: string = '';
  user: string = 'user';
  messageList: any[] = [];

  constructor(private websocketService: WebSocketService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.websocketService.joinRoom("Chat_Boot");
    this.user = this.route.snapshot.params['user'];
    this.listenerMessage();
    this.getUserRole();

  }

  listenerMessage() {
    this.websocketService.getMessageSubject().subscribe((messages: Message[]) => {
      this.messageList = messages.map((item: Message) => ({
        ...item,
        message_side: item.user === this.user ? 'sender' : 'receiver'
      }));
      this.refreshScroll();
    });
  }

  getUserRole(): string {
    if (this.user === 'user') {
      return 'user';
    } else if (this.user === 'admin') {
      return 'admin';
    } else {
      return this.user;
    }
  }

  sendMessage() {
    const chatMessage: Message = {
      messageContent: this.messageInput,
      user: this.user
    } as Message;
    this.websocketService.sendMessage( chatMessage, "Chat_Boot");
    this.refreshScroll();
    this.messageInput = '';
  }
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.sendMessage();
    }
  }

}
