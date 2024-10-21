import { Component,  EventEmitter,  Input, Output, OnInit,  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'time-picker-ng',
  standalone: true,
  imports: [],
  templateUrl: './time-picker-ng.component.html',
  styleUrls: ['./time-picker-ng.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimePickerNgComponent implements OnInit{
  @Input() time = "12"; //Formato de hora 12 o 24
  @Output() selectedTimeEvent = new EventEmitter<string>(); //Respuesta hora selecciona
  period: string = 'AM';
  private scrollTimeout:any;
  private selectedTime: string = "00:00";
  
  ngOnInit(): void {
    //Se obtiene los elementos que contiene los item de hora y minutos.
    const hourPicker = document.getElementById('hourPicker');
    const minutePicker = document.getElementById('minutePicker');

    this.generateTimeOptions(hourPicker,0,Number(this.time),1); // Se genera los div de horas
    this.generateTimeOptions(minutePicker,0,59,1); //se genera los div de minuntos

    //se recorre las horas y minutos; se llama las functionas updateSelection y centerSelectedItem
    [hourPicker, minutePicker].forEach(picker => {
      this.updateSelection(picker);
      this.centerSelectedItem(picker);
    })
    //Se llama a la funcion updateSelectedTime
    this.updateSelectedTime();
  }

  generateTimeOptions(container: any, start: number, end:number, step:number){
    //Se crea elementos de clase item
    for(let i = start; i<= end; i+= step){
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = i.toString().padStart(2,'0');
      container.appendChild(item);
    }
  }

  updateSelection(container: any){
    //Se obtiene todo los elemento con la clase .item
    const items = container.querySelectorAll('.item');
    //Se obtiene posición y dimensiones del conteneror    
    const containerRect = container.getBoundingClientRect();
    //Se calcular la mitad del contenedor
    const containerMiddle = containerRect.top + containerRect.height / 2;

    //Se inicializa las variables closestItem y minDistance
    let closestItem: any = null;
    let minDistance = Infinity;

    //Se recorre los elementos y se calcula que elemento esta en el centro para asignarle la clase .active
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
    //Se obtiene el elemento que tiene la clase .active
    const selectedItem = container.querySelector('.active');
    //Si existe elemento, se centra en el contenedor
    if(selectedItem){
      const containerHeight = container.clientHeight;
      const itemHeight = selectedItem.clientHeight;
      const scrollTop = selectedItem.offsetTop - (containerHeight / 2) + (itemHeight / 2);
      container.scrollTop = scrollTop;
    }
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
  }

  updateSelectedTime(){
    //se obtiene horas y minutos seleccionado.
    const selectedHour = document.querySelector('#hourPicker .active')?.textContent || '00';
    const selectedMinuted = document.querySelector('#minutePicker .active')?.textContent || '00';
    this.selectedTime =`${selectedHour}:${selectedMinuted}`;
  }

  saveTime(){
    this.selectedTimeEvent.emit(this.selectedTime);
  }

}
