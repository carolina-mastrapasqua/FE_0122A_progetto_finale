import { Client } from '../../models/client';
import { ClientsService } from '../../service/clients.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  totElements: number = 0;
  sizePages: number = 0;
  clients: Client[] = [];
  currentPage: number = 0;
  isLoading: boolean = true

  constructor(private clientsSrv: ClientsService, private router: Router) {}

  getCurrentPage(currentPage: any) {
    this.currentPage = currentPage;
    this.getClients(this.currentPage);
  }

  getClients(currentPage: any) {
    this.clientsSrv.getClients(currentPage).subscribe((clientsList: any) => {
      this.totElements = clientsList.totalElements;
      this.sizePages = clientsList.size;
      this.clients = clientsList.content;
      this.isLoading = false
    });
  }

  deleteClient(id: number) {
    this.clientsSrv.deleteClient(id).subscribe(() => {
      this.getClients(this.currentPage);
    });
  }

  goToClient(idCliente: any) {
    this.router.navigate(['/add-client', idCliente]);
  }

  goToInvoicesClient(idCliente: any) {
    this.router.navigate(['/invoices', idCliente]);
  }

  ngOnInit(): void {
    this.getClients(this.currentPage);
  }
}
