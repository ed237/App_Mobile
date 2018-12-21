import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NewsPage } from '../pages/news/news';
import { TabsPage } from '../pages/tabs/tabs';
import { AccueilPage } from '../pages/accueil/accueil';
import {SqlitePage} from '../pages/sqlite/sqlite';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    SqlitePage,

    TabsPage,
    AccueilPage
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    SqlitePage,

    TabsPage,
    AccueilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SqlitePage,
    SQLite,
    NativeStorage,
 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
