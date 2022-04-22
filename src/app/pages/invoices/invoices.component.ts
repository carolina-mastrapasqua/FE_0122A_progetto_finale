import { Invoice } from '../../models/invoice';
import { InvoicesService } from '../../service/invoices.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  totElements: number = 0
  sizePages: number = 0
  invoices: Invoice[] = [];
  currentPage: number = 0
  isLoading: boolean = true

  constructor(private invoicesSrv: InvoicesService, private route: ActivatedRoute, private router: Router) {}

  selectInvoices(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getInvoiceClient(id, this.currentPage);
    } else {
      this.getInvoices(this.currentPage)
    }
  }

  getCurrentPage(currentPage: any){
    this.currentPage = currentPage
    this.selectInvoices()
  }

  getInvoices(currentPage: any) {
    this.invoicesSrv.getInvoices(currentPage).subscribe((invoicesList: any) => {
      this.totElements = invoicesList.totalElements
      this.sizePages = invoicesList.size
      this.invoices = invoicesList.content;
      this.isLoading = false
    });
  }

  getInvoiceClient(idClient: string, currentPage: any){
    this.invoicesSrv.getInvoiceClient(idClient, currentPage).subscribe((invoicesList: any) => {
      this.totElements = invoicesList.totalElements
      this.sizePages = invoicesList.size
      this.invoices = invoicesList.content;
      this.isLoading = false
    })
  }

  deleteInvoice(id: number) {
    this.invoicesSrv.deleteInvoice(id).subscribe(() => {
      this.selectInvoices()
    });
  }

  goToInvoice(idInvoice: any) {
    this.router.navigate(['/add-invoice', idInvoice]);
  }

  ngOnInit(): void {
    this.selectInvoices()
  }

}
