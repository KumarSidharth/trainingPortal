import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { of } from 'rxjs';
import { Training } from '../models/training';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CardStagger } from '../animations/card-stagger.animation';

@Component({
  selector: 'infrrd-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  animations: [CardStagger]
})
export class TrainingsComponent implements OnInit {

  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  searchInput: string;

  constructor(
    private trainingService: TrainingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.trainingService
      .getTainings()
      .pipe(
        catchError( () => of([]))
      ).subscribe( (trainings) => {
        this.trainings = trainings;
        this.filterTrainings();
      });

    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      this.searchInput = queryParamMap.get('search');
      this.filterTrainings();
    });
  }

  addQueryParams(event: string): void {
    this.router.navigate(['trainings'], {
      queryParams: {
        search: event
      }
    });
  }

  filterTrainings(): void {
    if (!this.searchInput || !Array.isArray(this.trainings)) {
      this.filteredTrainings = this.trainings;
      return;
    }
    this.filteredTrainings = this.trainings
                        .filter(training => Object.values(training)
                          .some(value => {
                            const stringed = value.toString().toLowerCase();
                            return stringed.includes(this.searchInput.toLowerCase());
                        }));
  }

}
