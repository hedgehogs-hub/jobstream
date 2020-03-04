import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {ThemePalette} from "@angular/material/core";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  f: FormGroup;
  minValue: number = 160;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 500,
    hideLimitLabels: false,
    hidePointerLabels: false,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + value;
        case LabelType.High:
          return '' + value;
        case LabelType.Floor:
          return 'Min';
        case LabelType.Ceil:
          return 'Max';
        default:
          return '' ;
      }
    }
  };
  slidersRefresh: EventEmitter<void> = new EventEmitter<void>();
  checkBox = [
    {name: 'title', checked: true},
    {name: 'description', checked: true}
    ];

  platforms = [
    {value: 'UpWork', viewValue: 'UpWork'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
    {value: 'Guru', viewValue: 'Guru'},
  ];
  constructor(private fb: FormBuilder){
  }
  onCheckboxChange(e) {
    const  item = e.source.value;
    const title = this.f.get('title');
    const description = this.f.get('description');

    switch (item) {
      case 'title':
        if (!(title.value && description.value)) {
          description.setValue(true);
        }
        break;
      case 'description':
        if (!(title.value && description.value)) {
          title.setValue(true);
        }
        break;
    }
  }

  ngOnInit(): void {
    this.f = new FormGroup({
      'platform': new FormControl(),
      'title': new FormControl(true),
      'description': new FormControl(true),
      'search': new FormControl(null),
      'budget': new FormControl()
    })
  }
//
  search() {
    console.log(this.f.value);
  }

}
