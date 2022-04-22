import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Toaster} from "./models/toaster.model";
import {ToasterService} from "./service/toaster.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('inOut', [
      state('inRightToLeft', style({transform: 'translateX(0)'})),
      transition('* => inRightToLeft', [
        style({ opacity: 0 }),
        animate('700ms', keyframes([
          style({opacity: 0, transform: 'translateX(100%)'}),
          style({opacity: 1, transform: 'translateX(0)'})]
        ))]
      ),
      transition('inRightToLeft => *', [
        animate('700ms', keyframes([
          style({opacity: 1, transform: 'translateX(0%)'}),
          style({opacity: 0, transform: 'translateX(100%)'})]
        ))]
      ),
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'ProgettoFinale';

  toasters$: Observable<Toaster[]>;

  constructor(private toasterService: ToasterService, private cdref: ChangeDetectorRef) {
    this.toasters$ = this.toasterService.toasters$;
  }

  ngOnInit(): void {
  }

  closeToaster(toaster: Toaster) {
    this.toasterService.removeToaster(toaster);
  }

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
  }
}
