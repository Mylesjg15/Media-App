import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  socket;
  message: string;
  user: string;

  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  // Seeing sent messages
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);

    this.socket.on('user', (data: string) => {
      if (data) {
        const element2 = document.createElement('strong');
        element2.innerHTML = data;
        element2.style.textAlign = 'right';
        document.getElementById('message-item').appendChild(element2);
        console.log("This is the set up socket function for username" + element2 );
        }
    });
    
    this.socket.on('message', (data: string) => {
    if (data) {
      const element1 = document.createElement('p');
      element1.innerHTML = data;
      document.getElementById('message-item').appendChild(element1);
      console.log("This is the set up socket function for message" + element1 );
      }
    });

  }

  // Sending messages and seeing them
  SendMessage() {

    this.socket.emit('user', this.user);
    const element2 = document.createElement('strong');
    element2.innerHTML = this.user;
    element2.style.textAlign = 'right';
    document.getElementById('message-item').appendChild(element2);
    console.log("This is the send message function for username" + element2 );
    
    this.socket.emit('message', this.message);
    const element1 = document.createElement('p');
    element1.innerHTML = this.message;
    document.getElementById('message-item').appendChild(element1);
    console.log("This is the send message function for message" + element1 );

    this.message = '';

  }

}
