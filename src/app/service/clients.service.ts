import { Client } from './../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientForm } from '../models/client-form';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  serverAddress = 'http://epicode.online/epicodebeservice_v2';

  constructor(private http: HttpClient) {}

  getClients(idPage: string) {
    return this.http.get<Client[]>(
      this.serverAddress + '/api/clienti?page=' + idPage
    );
  }

  addClient(data: ClientForm): Observable<any> {
    return this.http.post<ClientForm>(
      this.serverAddress + '/api/clienti',
      data
    );
  }

  deleteClient(idCliente: number) {
    return this.http.delete<Client>(
      this.serverAddress + '/api/clienti/' + idCliente
    );
  }

  getById(idCliente: any) {
    return this.http.get<Client>(
      this.serverAddress + '/api/clienti/' + idCliente
    );
  }

  modifyClient(idCliente: any, data: Client) {
    return this.http.put<Client>(
      this.serverAddress + '/api/clienti/' + idCliente,
      data
    );
  }
}
