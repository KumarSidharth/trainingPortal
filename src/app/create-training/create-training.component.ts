import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../models/departments';
import { NgForm } from '@angular/forms';
import { MeetingRoom } from '../models/meetingRoom';
import Swal from 'sweetalert2';
import { TrainingService } from '../services/training.service';
import { Training } from '../models/training';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  loading = false;
  today: string;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setToday();
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

  setToday() {
    const date = new Date();
    const month = date.getMonth() + 1; // January is 0;
    let monthString = '';
    month < 10 ?
      monthString = '0' + month :
      monthString = month.toString();
    this.today = `${date.getFullYear()}-${monthString}-${date.getDate()}`;
  }

  create(form: NgForm): void {
    console.log(form);
    this.loading = true;
    if (form.valid) {
      this.trainingService.createTraining(new Training(form.value))
        .pipe(
          finalize( () => this.loading = false)
        )
        .subscribe( () => {
          Swal.fire(
            'Training created',
            `Scheduled on ${form.value.date} at ${form.value.startTime}`,
            'success'
          );
          this.router.navigate(['trainings']);
        }, (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    }
  }

}
