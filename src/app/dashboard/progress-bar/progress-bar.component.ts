
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() grade: number = 10;

  @Input() primary: string = "";
  @Input() secondary: string = "";

  getProgressBarStyle(): object {
    const width: number = this.grade * 10;

    const style: {width: string} = {
      'width': `${width}%`
    };
    return style;
  }

  getProgressBarClass(): string {
    if (this.grade >= 8) {
      return 'progress-bar-green';
    } else if (this.grade >= 5) {
      return 'progress-bar-yellow';
    } else if (this.grade > 0) {
      return 'progress-bar-red';
    } else {
      return 'progress-bar-empty';
    }
  }
}
