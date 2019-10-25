import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/contact.service';
import { Contact } from 'src/app/shared/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  list: Contact[];
  constructor(private service: ContactService, private fireStore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getContacts().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Contact
      })
    })
  }

  onEdit(contact: Contact) {
    this.service.formData = Object.assign({}, contact);
  }

  onDelete(id) {
    if (confirm("Are you sure to delete this record?")) {
      this.fireStore.doc('contacts/' + id).delete();
      this.toastr.warning('Deleted Successfully', 'PHONEBOOK');
    }
  }

}
