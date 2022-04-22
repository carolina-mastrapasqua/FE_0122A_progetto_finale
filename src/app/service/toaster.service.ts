import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Toaster} from '../models/toaster.model';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  private toastersSubject$ = new BehaviorSubject<Toaster[]>([]);
  toasters$ = this.toastersSubject$.asObservable();

  generateToaster(toaster: Toaster) {
    const messages = this.toastersSubject$.value || [];
    this.toastersSubject$.next([...messages, toaster]);
  }

  removeToaster(toaster: Toaster) {
    const index = this.toastersSubject$.value.indexOf(toaster);
    if (index > -1) {
      this.toastersSubject$.value.splice(index, 1);
    }
  }
}
