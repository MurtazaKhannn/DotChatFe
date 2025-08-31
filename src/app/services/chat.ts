import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // The connection to the SignalR hub
  private hubConnection!: signalR.HubConnection;
  
  // An observable to hold the messages received from the hub
  private messageSource = new BehaviorSubject<any[]>([]);
  public messages$ = this.messageSource.asObservable();

  public connectionEstablished$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Establishes the connection to the backend hub
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      // Make sure the port matches your backend URL (e.g., 7198, 5201)
      .withUrl('https://localhost:7228/chathub' , {
        withCredentials: true
      }) 
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionEstablished$.next(true);
      })
      .catch(err => console.log('Error while starting connection: ' + err));

      this.hubConnection.onclose(err => {
        console.log('Connection closed');
        this.connectionEstablished$.next(false);
      });

      this.addReceiveMessageListener();
  }

  // Sets up a listener for the "ReceiveMessage" event from the hub
  public addReceiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      const currentMessages = this.messageSource.value;
      this.messageSource.next([...currentMessages, { user, message }]);
    });
  }

  // Invokes the "sendMessage" method on the backend hub
  public sendMessage = (message: string) => {
    this.hubConnection.invoke('sendMessage', message)
      .catch(err => console.error(err));
  }
}