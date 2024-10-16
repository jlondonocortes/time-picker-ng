import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerNgComponent } from './time-picker-ng.component';

describe('TimePickerNgComponent', () => {
  let component: TimePickerNgComponent;
  let fixture: ComponentFixture<TimePickerNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePickerNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
