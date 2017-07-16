import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/ng2-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TopNavigationComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    HttpModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
