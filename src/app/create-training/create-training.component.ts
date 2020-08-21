import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../models/departments';
import { NgForm } from '@angular/forms';
import { MeetingRoom } from '../models/meetingRoom';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { TrainingService } from '../services/training.service';
import { Training } from '../models/training';
import { Router, ActivatedRoute } from '@angular/router';
import { flatMap, take } from 'rxjs/operators';
import { TrainingForm } from '../models/trainingForm';
import { Observable } from 'rxjs';

@Component({
  selector: 'infrrd-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild('firstInput') private firstInput: ElementRef<HTMLInputElement>;
  departments = Object.values(Department);
  meetingRooms = Object.values(MeetingRoom);
  durations = Array(8).fill(1)
                      .map( (n, index) => n += index);
  today: string;
  form: TrainingForm = {
    id: '',
    title: '',
    department: null,
    duration: null,
    date: null,
    startTime: null,
    room: null,
  };
  mode: 'create' | 'update' = 'create';

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.routeConfig.path.match('edit')) {
      this.mode = 'update';
      this.getTraining();
    }
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

  getTraining(): void {
    this.activeRoute.paramMap
        .pipe(
          take(1),
          flatMap(paramMap => this.trainingService.getTrainingById(paramMap.get('id'))
        ))
        .subscribe( (training: Training) =>
          this.form = new TrainingForm(training));
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
    this.save(
      form,
      this.trainingService.createTraining(new Training(form.value)),
      {
        title: 'Saving',
        text: 'Training is being created...',
        timerProgressBar: true,
        onBeforeOpen: () => Swal.showLoading()
      });
  }

  edit(form: NgForm): void {
    this.save(
      form,
      this.trainingService.editTaining(new Training(form.value)),
      {
        title: 'Changing',
        text: 'Training is being editted...',
        timerProgressBar: true,
        onBeforeOpen: () => Swal.showLoading()
      });
  }

  save(form: NgForm,
       training$: Observable<Training>,
       swalOptions: SweetAlertOptions): void {

      if (!form.valid) {
        return;
      }

      Swal.fire(swalOptions);
      training$
        .subscribe( () => {
          Swal.fire(
            'Training saved',
            `Scheduled on ${form.value.date} at ${form.value.startTime}`,
            'success'
          ).then( () => this.router.navigate(['trainings']));
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
