import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { Observable, of } from 'rxjs';
import { Training } from '../models/training';
import { take, catchError } from 'rxjs/operators';

@Component({
  selector: 'infrrd-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  trainings$: Observable<Training[]>;
  searchInput: string;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainings$ = this.trainingService
                        .getTainings()
                        .pipe(
                          take(1),
                          catchError( () => of([]))
                        );
  }

}
