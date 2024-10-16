import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'time-picker-ng',
  standalone: true,
  imports: [NgFor],
  templateUrl: './time-picker-ng.component.html',
  styleUrls: ['./time-picker-ng.component.css']
})
export class TimePickerNgComponent {
  hours: number[] = Array.from({length: 12}, (_, i) => i + 1);
  minutes: number[] = Array.from({length: 60}, (_, i) => i);
  selectedHour: number = 1;
  selectedMinute: number = 0;
  period: string = 'AM';

  setPeriod(newPeriod: string) {
    this.period = newPeriod;
    //this.updateTime();
  }

  saveTime(){
    const hour = document.getElementById('minute');
    console.log(hour);
  }
}
