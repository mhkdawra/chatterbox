import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({  
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Observable<any[]>;
  msg: string;
  msgDate;
  userName: string;
  hasUser: boolean;
  roomName: string;
  rooms: any[];
  noRoom: boolean = false;
  noUserName: boolean = false;


  constructor(public afs: AngularFirestore) { }

  ngOnInit() {
    this.rooms = [];
    this.afs.collection("rooms").ref.get().then( (querySnapshot) => {
      querySnapshot.forEach( (doc) => {
          this.rooms.push(doc.id);
      });
    });
  }

  enterUser() {

    if (this.userName === '' || this.userName == null){
      this.noUserName = true;
      this.hasUser = false;
    }
    else if (this.roomName == null){
      this.hasUser = false;
      this.noRoom = true;
    }
    else{
      this.hasUser = true;
      const itemRef = this.afs.collection('users'); 
      itemRef.add({'username': this.userName});
      console.log(this.roomName);
      this.getChatData();
    }
  }

  handleUser(event) {
    if (event.keyCode === 13) {
      this.enterUser();
    }
  }
  
  getChatData() {
    this.messages = this.afs.collection("rooms").doc(this.roomName).collection('chat_messages', ref => ref.orderBy('msgDate')).valueChanges();
  }

  newMessage() {
    if (this.msg == null || this.msg === ''){ }
    else{
      this.msgDate = new Date();
      const itemRef = this.afs.collection("rooms").doc(this.roomName).collection('chat_messages');
      itemRef.add({'message': this.msg, 'msgDate': this.msgDate, 'user':this.userName });
      this.msg = '';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.newMessage();
    }
  }

  leaveRoom(){
    this.hasUser = false;
    this.roomName = null;
  }

}
