import { AuthService } from '../../service/auth.service';
import { Component } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from "../../service/toaster.service";
import { Toaster } from "../../models/toaster.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent{

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  onSubmit() {
    if(this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    let payload = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: [this.signUpForm.value.role],
    };
    this.authSrv.signUp(payload).subscribe(() => {
      this.toasterService.generateToaster(new Toaster('success', 'Complimenti', 'Registrazione avvenuta con successo'));
      this.router.navigate(['/login']);
    }, error => {
      this.toasterService.generateToaster(new Toaster('error', 'Errore!', 'Credenziali non valide'));
    });
  }

}
