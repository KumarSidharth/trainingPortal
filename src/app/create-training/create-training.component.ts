import { Component, OnInit } from '@angular/core';
import { Department } from '../models/departments';
import { NgForm } from '@angular/forms';
import { MeetingRoom } from '../models/meetingRoom';
import Swal from 'sweetalert2';

@Component({
  selector: 'infrrd-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit {

  departments = Object.values(Department);
  meetingRooms = Object.values(MeetingRoom);
  durations = Array(8).fill(1)
                      .map( (n, index) => n += index);

  constructor() { }

  ngOnInit(): void {
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
