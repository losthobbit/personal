import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/ng2-bootstrap';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

import { MenuService } from './menu/menu.service';
import { ConfigService } from './config.service';

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
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [MenuService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
