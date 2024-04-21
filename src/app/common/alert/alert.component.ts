import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alertText: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.alertText = data.message;
  }

  reload(){
    window.location.reload();
  }

}
