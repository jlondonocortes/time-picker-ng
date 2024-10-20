import { Component,  EventEmitter,  Input, Output, OnInit,  ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'time-picker-ng',
  standalone: true,
  imports: [NgFor],
  templateUrl: './time-picker-ng.component.html',
  styleUrls: ['./time-picker-ng.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimePickerNgComponent implements OnInit{
  @Input() time = "12";
  @Output() selectedTimeEvent = new EventEmitter<string>();
  period: string = 'AM';
  private scrollTimeout:any;
  
  ngOnInit(): void {
    console.log(this.time);

    const hourPicker = document.getElementById('hourPicker');
    const minutePicker = document.getElementById('minutePicker');
    this.generateTimeOptions(hourPicker,0,Number(this.time),1);
    this.generateTimeOptions(minutePicker,0,59,1);

    [hourPicker, minutePicker].forEach(picker => {
      this.updateSelection(picker);
      this.centerSelectedItem(picker);
    })
    
    this.updateSelectedTime();
  }

  generateTimeOptions(container: any, start: number, end:number, step:number){
    for(let i = start; i<= end; i+= step){
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = i.toString().padStart(2,'0');
      container.appendChild(item);
    }
  }

  updateSelection(container: any){
    const items = container.querySelectorAll('.item');
    const containerRect = container.getBoundingClientRect();
    const containerMiddle = containerRect.top + containerRect.height / 2;

    let closestItem: any = null;
    let minDistance = Infinity;

    items.forEach((item:any) =>{
      const itemRect = item.getBoundingClientRect();
      const itemMiddle = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemMiddle - containerMiddle);

      if(distance < minDistance){
        minDistance = distance;
        closestItem = item;
      }

      item.classList.remove('active');
    });

    if(closestItem){
      closestItem?.classList.add('active');
    }
  }

  centerSelectedItem(container:any){
    const selectedItem = container.querySelector('.active');
    if(selectedItem){
      const containerHeight = container.clientHeight;
      const itemHeight = selectedItem.clientHeight;
      const scrollTop = selectedItem.offsetTop - (containerHeight / 2) + (itemHeight / 2);
      container.scrollTop = scrollTop;
    }
  }

  updateSelectedTime(){
    const selectedHour = document.querySelector('#hourPicker .active')?.textContent || '00';
    const selectedMinuted = document.querySelector('#minutePicker .active')?.textContent || '00';
    const selectedTime = document.getElementById('selectedTime');

    selectedTime?.setHTMLUnsafe(`${selectedHour}:${selectedMinuted}`);
  }

  eventScroll(event: any){
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.updateSelection(event.srcElement)
      this.centerSelectedItem(event.srcElement);
      this.updateSelectedTime();
    }, 100);    
  }
  
  setPeriod(newPeriod: string) {
    this.period = newPeriod;
    //this.updateTime();
  }

  saveTime(){
    const hour = document.getElementById('selectedTime');
    const selectedTime = hour?.textContent||"00:00";
    console.log(hour?.textContent);
    this.selectedTimeEvent.emit(selectedTime);
  }

}
