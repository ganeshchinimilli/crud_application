import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { PipeModule } from 'src/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    AddTaskComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 15 seconds
      closeButton: false,
      progressBar: true,
    }),
    AppRoutingModule,
    PipeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
