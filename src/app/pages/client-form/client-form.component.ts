import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/service/clients.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  constructor(
    private clientSrv: ClientsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  clientId: string | null = '';
  data!: Client;
  isAddMode: boolean = true;
  signUpForm!: FormGroup;
  formSo!: FormGroup;
  formSl!: FormGroup;
  comuneSo!: FormGroup;
  provinciaSo!: FormGroup;
  comuneSl!: FormGroup;
  provinciaSl!: FormGroup;

  buildPayload(){
    return {
      nomeContatto: this.signUpForm.value.nomeContatto,
      cognomeContatto: this.signUpForm.value.cognomeContatto,
      ragioneSociale: this.signUpForm.value.ragioneSociale,
      partitaIva: this.signUpForm.value.partitaIva,
      email: this.signUpForm.value.email,
      pec: this.signUpForm.value.pec,
      telefonoContatto: this.signUpForm.value.telefonoContatto,
      emailContatto: this.signUpForm.value.emailContatto,
      telefono: this.signUpForm.value.telefono,
      tipoCliente: 'SRL',
      indirizzoSedeOperativa: {
        via: this.formSo.value.via,
        civico: this.formSo.value.civico,
        cap: this.formSo.value.cap,
        localita: this.formSo.value.localita,
        comune: {
          id: 1,
          nome: this.comuneSo.value.nomeComune,
          provincia: {
            id: 1,
            nome: this.provinciaSo.value.nomeProvincia,
            sigla: this.provinciaSo.value.siglaProvincia,
          },
        },
      },

      indirizzoSedeLegale: {
        via: this.formSl.value.viaSl,
        civico: this.formSl.value.civicoSl,
        cap: this.formSl.value.capSl,
        localita: this.formSl.value.localitaSl,
        comune: {
          id: 1,
          nome: this.comuneSl.value.nomeComuneSl,
          provincia: {
            id: 1,
            nome: this.provinciaSl.value.nomeProvinciaSl,
            sigla: this.provinciaSl.value.siglaProvinciaSl,
          },
        },
      },

      dataInserimento: new Date(),
      dataUltimoContatto: new Date(),
    };
  }

  addClient(){
    let payload: any = this.buildPayload()
    this.clientSrv.addClient(payload).subscribe();
  }

  modifyClient() {
    let payload: any = this.buildPayload()
    this.clientSrv.modifyClient(this.clientId, payload).subscribe();
  }

  onSubmit() {
    if(this.isAddMode){
      this.addClient()
    }else{
      this.modifyClient()
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientSrv.getById(id).subscribe((client) => {
        this.initForms(client);
        this.isAddMode = false;
      });
    } else {
      this.initForms();
      this.isAddMode = true;
    }
    this.clientId = id;
  }

  initForms(client?: Client) {
    this.signUpForm = this.fb.group({
      nomeContatto: [client?.nomeContatto, Validators.required],
      cognomeContatto: [client?.cognomeContatto, Validators.required],
      ragioneSociale: [client?.ragioneSociale, Validators.required],
      partitaIva: [client?.partitaIva, Validators.required],
      email: [client?.email, Validators.required],
      pec: [client?.pec, Validators.required],
      telefonoContatto: [client?.telefonoContatto, Validators.required],
      emailContatto: [client?.emailContatto, Validators.required],
      telefono: [client?.telefono, Validators.required],
      tipoCliente: [client?.tipoCliente, Validators.required],
    });
    this.formSo = this.fb.group({
      via: [client?.indirizzoSedeOperativa.via, Validators.required],
      civico: [client?.indirizzoSedeOperativa.civico, Validators.required],
      cap: [client?.indirizzoSedeOperativa.cap, Validators.required],
      localita: [client?.indirizzoSedeOperativa.localita, Validators.required],
    });
    this.comuneSo = this.fb.group({
      nomeComune: [client?.indirizzoSedeOperativa.comune.nome, Validators.required],
    });
    this.provinciaSo = this.fb.group({
      nomeProvincia: [client?.indirizzoSedeOperativa.comune.provincia.nome, Validators.required],
      siglaProvincia: [client?.indirizzoSedeOperativa.comune.provincia.sigla, Validators.required],
    });
    this.formSl = this.fb.group({
      viaSl: [client?.indirizzoSedeLegale.via, Validators.required],
      civicoSl: [client?.indirizzoSedeLegale.civico, Validators.required],
      capSl: [client?.indirizzoSedeLegale.cap, Validators.required],
      localitaSl: [client?.indirizzoSedeLegale.localita, Validators.required],
    });
    this.comuneSl = this.fb.group({
      nomeComuneSl: [client?.indirizzoSedeLegale.comune.nome, Validators.required],
    });
    this.provinciaSl = this.fb.group({
      nomeProvinciaSl: [client?.indirizzoSedeLegale.comune.provincia.nome, Validators.required],
      siglaProvinciaSl: [client?.indirizzoSedeLegale.comune.provincia.sigla, Validators.required],
    });
  }

}
