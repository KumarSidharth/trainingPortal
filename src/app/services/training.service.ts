import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITrainingResonse } from '../models/trainingResponse';
import { ITraining } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  readonly trainingUrl = 'training';

  constructor(private http: HttpClient) { }

  changeTrainingTimeType = (training: ITrainingResonse): ITraining => {
      return {
        ...training,
        time: new Date(training.time)
      };
  }


  getTainings(query?: string): Observable<ITraining[]> {
    const queryParams = {
      search: query
    };
    return this.http.get<ITrainingResonse[]>(this.trainingUrl, {
      params: query ? queryParams : undefined
    }).pipe(
      map(trainings => trainings.map(training => this.changeTrainingTimeType(training))
    ));
  }

  /**
   * @todo refactor map
   */
  getTrainingById(trainingId: ITraining['id']): Observable<ITraining> {
    return this.http.get<ITrainingResonse>(`${this.trainingUrl}/${trainingId}`).pipe(
      map(trainingResponse => this.changeTrainingTimeType(trainingResponse))
    );
  }

  createTraining(training: ITraining): Observable<ITraining> {
    return this.http.post<ITrainingResonse>(this.trainingUrl, training).pipe(
      map(trainingResponse => this.changeTrainingTimeType(trainingResponse))
    );
  }

  editTaining(training: ITraining): Observable<ITraining> {
    return this.http.put<ITrainingResonse>(this.trainingUrl, training).pipe(
      map(trainingResponse => this.changeTrainingTimeType(trainingResponse)));
  }
}
