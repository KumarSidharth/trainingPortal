import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingsComponent } from './trainings/trainings.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { TrainingEventComponent } from './training-event/training-event.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'trainings',
    children: [
      {
        path: '',
        component: TrainingsComponent
      },
      {
        path: 'create',
        component: CreateTrainingComponent
      },
      {
        path: 'edit',
        component: CreateTrainingComponent
      },
      {
        path: ':id',
        component: TrainingEventComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    /**
     * adds a # before angular routes
     * makes sure that when browser is reloaded, you don't see a server error page
     * You can always set configuration of servers.
     * For this project, I don't know now which server I am going to host this.
     */
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
