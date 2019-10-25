import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  formData: Contact;

  constructor(private fireStore: AngularFirestore) { }

  getContacts() {
    return this.fireStore.collection('contacts').snapshotChanges();
  }
}
