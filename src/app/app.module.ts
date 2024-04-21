import {  NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { BannerComponent } from './common/banner/banner.component';
import { FooterComponent } from './common/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { PricePipe } from './pipes/price.pipe';
import { AlertComponent } from './common/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    AngularFireModule.initializeApp({"projectId":"webfejl-tech-shop","appId":"1:461669402493:web:465b7eff63dae24c3eae14","storageBucket":"webfejl-tech-shop.appspot.com","apiKey":"AIzaSyB6cHCx9IyZqsS3R1sXvw-ARmevBaApz7Y","authDomain":"webfejl-tech-shop.firebaseapp.com","messagingSenderId":"461669402493"}),
    // provideFirebaseApp(() => initializeApp({"projectId":"webfejl-tech-shop","appId":"1:461669402493:web:465b7eff63dae24c3eae14","storageBucket":"webfejl-tech-shop.appspot.com","apiKey":"AIzaSyB6cHCx9IyZqsS3R1sXvw-ARmevBaApz7Y","authDomain":"webfejl-tech-shop.firebaseapp.com","messagingSenderId":"461669402493"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
