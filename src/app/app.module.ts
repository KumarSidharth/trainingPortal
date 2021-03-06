import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { TrainingEventComponent } from './training-event/training-event.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UrlInterceptorService } from './services/url-interceptor.service';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CreateTrainingComponent,
    TrainingEventComponent,
    NotFoundPageComponent,
    WelcomeComponent,
    HighlightPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptorService,
      multi: true
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
