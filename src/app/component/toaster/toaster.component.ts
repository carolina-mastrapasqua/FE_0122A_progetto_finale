import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Toaster} from '../../models/toaster.model';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  // @ts-ignore
  @Input() toaster: Toaster;
  @Output() onCloseEvent = new EventEmitter<string>();
  icon: any;
  private timer: any;

  constructor() {
  }

  ngOnInit(): void {
    if (this.toaster.type === 'info') {
      this.icon = 'fa fa-info';
    } else if (this.toaster.type === 'success') {
      this.icon = 'fa fa-check';
    } else if (this.toaster.type === 'warning') {
      this.icon = 'fa fa-exclamation';
    } else if (this.toaster.type === 'error') {
      this.icon = 'fa fa-times';
    } else {
      this.icon = null;
    }
    if (this.toaster.expire > 0) {
      this.timer = setTimeout(() => {
        this.onClose();
      }, this.toaster.expire);
    }
  }

  onClose() {
    clearTimeout(this.timer);
    this.onCloseEvent.emit();
  }
}
