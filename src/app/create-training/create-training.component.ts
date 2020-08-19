import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../models/departments';
import { NgForm } from '@angular/forms';
import { MeetingRoom } from '../models/meetingRoom';
import Swal from 'sweetalert2';

@Component({
  selector: 'infrrd-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild('firstInput') private firstInput: ElementRef;
  departments = Object.values(Department);
  meetingRooms = Object.values(MeetingRoom);
  durations = Array(8).fill(1)
                      .map( (n, index) => n += index);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /**
     * Auto focus on the first input element
     * Can be done using a pipe for bigger projects
     */
    if (this.firstInput) {
      this.firstInput.nativeElement.focus();
    }
  }

  create(form: NgForm): void {
    console.log(form);
    if (form.valid) {
      Swal.fire(
        'Training created',
        'Scheduled on this date and time',
        'success'
      );
    }
  }

}
