import { Observable } from 'rxjs';
import { InvoiceForm } from './../models/invoice-form';
import { Invoice } from './../models/invoice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  serverAddress = 'http://epicode.online/epicodebeservice_v2';

  constructor(private http: HttpClient) {}

  getInvoices(idPage: number) {
    return this.http.get<Invoice[]>(this.serverAddress + '/api/fatture?page=' + idPage);
  }

  getInvoiceClient(idClient: string, idPage: number){
    return this.http.get<Invoice[]>(this.serverAddress + '/api/fatture/cliente/' + idClient + '?page=' + idPage)
  }

  deleteInvoice(idInvoice: any) {
    return this.http.delete<Invoice>(
      this.serverAddress + '/api/fatture/' + idInvoice
    );
  }

  addInvoice(data: InvoiceForm): Observable<any> {
    return this.http.post<InvoiceForm>(
      this.serverAddress + '/api/fatture', data);
  }

  modifyInvoice(idInvoice: any, data: InvoiceForm) {
    return this.http.put<InvoiceForm>(
      this.serverAddress + '/api/fatture/' + idInvoice, data);
  }

  getById(idInvoice: any) {
    return this.http.get<InvoiceForm>(
      this.serverAddress + '/api/fatture/' + idInvoice
    );
  }

}
