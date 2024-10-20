<h1 align="center">TimePickerNg</h1>

## Usage

### 1.Install component

```sh
npm i --save time-picker-ng
```

### 2. Import component

```ts
import {TimePickerNgComponent } from '@time-picker-ng'

@Component({
    imports:[TimePickerNgComponent]
})
export class AppComponent {
    //Get time
    getSelectedTime(time: string){
        console.log(time);
    }
}
```

```html
<time-picker-ng
time="12"
(selectedTimeEvent)="getSelectedTime($event)"
></time-picker-ng>
```

### Configure
| Name               | Type     | Description                        |
| ------------------ | -------- |----------------------------------- |
| time               | string   | Format time 12 or 24. default: 12  |
| selectedTimeEvent  | function | Return selectedTime to string      |

## License

[MIT](./LICENSE)