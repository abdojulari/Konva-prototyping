import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import * as Services from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { NoteComponent } from './note/note.component';
import { AngularResizeEventModule } from 'angular-resize-event';



@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    StickyNoteComponent, 
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularResizeEventModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    Services.KonvaService,
    Services.SocketClientService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
