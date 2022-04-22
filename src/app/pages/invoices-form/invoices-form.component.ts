import { InvoiceForm } from '../../models/invoice-form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/service/invoices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoices-form',
  templateUrl: './invoices-form.component.html',
  styleUrls: ['./invoices-form.component.scss']
})
export class InvoicesFormComponent implements OnInit {

  invoiceForm!: FormGroup;
  statoInvoice!: FormGroup;
  clienteForm!: FormGroup;
  isAddMode: boolean = true
  invoiceId: string | null = '';

  constructor(private invoiceSrv: InvoicesService, private route: ActivatedRoute, private fb: FormBuilder ) { }

  buildPayload(){
    return {
      data: new Date(),
      numero: this.invoiceForm.value.numero,
      anno: this.invoiceForm.value.anno,
      importo: this.invoiceForm.value.importo,
      stato: {
        id: 1,
        nome: this.statoInvoice.value.nome,
      },
      cliente: {
        id: this.clienteForm.value.id,
      }
    }
  }

  addInvoice(){
    let payload: any = this.buildPayload()
    this.invoiceSrv.addInvoice(payload).subscribe();
  }

  modifyInvoice() {
    let payload: any = this.buildPayload()
    this.invoiceSrv.modifyInvoice(this.invoiceId, payload).subscribe();
  }

  onSubmit() {
    if(this.isAddMode){
      this.addInvoice()
    }else{
      this.modifyInvoice()
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceSrv.getById(id).subscribe((invoice) => {
        this.initForms(invoice);
        this.isAddMode = false;
      });
    } else {
      this.initForms();
      this.isAddMode = true;
    }
    this.invoiceId = id;
  }

  initForms(invoice?: InvoiceForm) {
    this.invoiceForm = this.fb.group({
      data: [invoice?.data, Validators.required],
      numero: [invoice?.numero, Validators.required],
      anno: [invoice?.anno, Validators.required],
      importo: [invoice?.importo, Validators.required],
    });
    this.statoInvoice = this.fb.group({
      nome: [invoice?.stato.nome, Validators.required],
    });
    this.clienteForm = this.fb.group({
      id: [invoice?.cliente.id, Validators.required],
    });
  }
}
