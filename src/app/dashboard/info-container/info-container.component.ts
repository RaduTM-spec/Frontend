import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.css']
})
export class InfoContainerComponent {

  @Input() userType: string = '';
  @Input() teamGrade: number = 0;
  @Input() number: number = 0;

  exportSituation() {

  }


}
