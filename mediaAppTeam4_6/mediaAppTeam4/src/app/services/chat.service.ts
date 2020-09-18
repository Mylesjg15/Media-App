import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');

  joinRoom(data)
  {
    this.socket.emit('join', data)
  }

  newMessage() {
    let observable = new Observable<{user: String, msg: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  constructor() { }
}
