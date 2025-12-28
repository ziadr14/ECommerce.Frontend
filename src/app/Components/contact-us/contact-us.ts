import { Component } from '@angular/core';
import { ContactService } from '../../Services/ContactMessage/contact-message';
import { ContactMessage } from '../../Interface/icontectMeggase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule , FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
  model: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  loading = false;
  success = false;
  error = false;

  constructor(private contactService: ContactService) {}

  sendMessage() {
    this.loading = true;
    this.success = false;
    this.error = false;

    this.contactService.sendMessage(this.model).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.model = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
