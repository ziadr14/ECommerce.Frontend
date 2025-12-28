import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMessage } from '../../Interface/icontectMeggase';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private apiUrl = `${environment.baseUrl}/contact`;

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactMessage) {
    return this.http.post(this.apiUrl, data);
  }
}
