import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'; // <-- 1. IMPORT FormsModule
import { CommonModule } from '@angular/common'; // <-- 2. IMPORT CommonModule for *ngFor

@Component({
  selector: 'app-chat',
  standalone: true, // <-- 3. MAKE IT STANDALONE
  imports: [
    FormsModule,    // <-- 4. ADD FormsModule HERE
    CommonModule    // <-- 5. ADD CommonModule HERE
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  user: string = '';
  message: string = '';

  constructor(
    public chatService: ChatService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.addReceiveMessageListener();
    
    this.chatService.messages$.subscribe(res => {
      this.messages = res;
    });

    this.authService.currentUser$.subscribe(user => {
        if (user) {
            this.user = user.name;
        }
    });
  }

  sendMessage(): void {
    if (this.message) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // After the backend confirms logout, redirect to the login page
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Logout failed', err)
    });
  }

}