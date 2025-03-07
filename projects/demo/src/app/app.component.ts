import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimePickerNgComponent } from '../../../../dist/time-picker-ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TimePickerNgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';


  alertSelectedTime(time:string){
    alert(time);
  }
}
