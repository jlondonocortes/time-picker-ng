import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'time-picker-ng',
  standalone: true,
  imports: [NgFor],
  templateUrl: './time-picker-ng.component.html',
  styleUrls: ['./time-picker-ng.component.css']
})
export class TimePickerNgComponent{
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

  eventoScroll(event: any){
    //obtenemo elementos con la clase .time-column
    const elemento = document.querySelector('.time-column');
    //llamamos función para definir elemento activo
    this.actualizarItemActivo(elemento);
    //llamamos function para manjera el scroll infinito
    this.manejarScrollInfinito(elemento);
  }

  actualizarItemActivo(elemento: any){    
    //obtenemo posicion y tamaño del elemento
    const objetoDom = elemento?.getBoundingClientRect(); 
    //calculamo posición centro
    const posCentro = (objetoDom?.top??0) + (objetoDom?.height??0) /2;
    //recorremo elemento dentro de la clase .time-column
    Array.from(elemento?.children??[]).forEach((item:any) => { 
      //obtenemo posicion y tamaño de los elementos hijos
      const itemDom = item.getBoundingClientRect();
      //calculamos posición centro del elemento hijo
      const itemPosCentro = itemDom.top + itemDom.height/2;
      //se verifica si elemento hijo es el que esta en el centro del elemento contenedor padre
      //se le agrega la clase .active si se cumple la condición, si no se quita.
      if(Math.abs(itemPosCentro - posCentro)< 63/2){
        item.classList.add('active');
      }else{
        item.classList.remove('active');
      }
    })
  }

  manejarScrollInfinito(elemento: any){
    const scrollTop = elemento.scrollTop;
    const scrollHeight = elemento.scrollHeight;
    const clientHeight = elemento.clientHeight;
    const totalHeight = 63 * this.hours.length;

    if(scrollTop + clientHeight > scrollHeight - totalHeight){
      //continuar
    }
  }

}
