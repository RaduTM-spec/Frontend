
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() grade: number = 10;

  getProgressBarStyle(): object {
    const width = this.grade * 10; // Assuming each grade unit corresponds to 10% width
    const style = {
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

