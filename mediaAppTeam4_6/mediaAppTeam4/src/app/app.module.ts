import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {AuthGuard} from 'src/app/guards/auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ChatBoxComponent } from './components/home/chat-box/chat-box.component';
import { WeatherComponent } from './components/home/weather/weather.component';
import { NewsComponent } from './components/home/news/news.component';
import { AboutUsComponent } from './components/shared/about-us/about-us.component';
import { ContactUsComponent } from './components/shared/contact-us/contact-us.component';
import { SportsNewsComponent } from './components/sports-news/sports-news.component';
import { ImageSliderComponent } from './components/home/image-slider/image-slider.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AddNewsComponent } from './components/admin/add-news/add-news.component';
import { DataViewListComponent } from './components/admin/data-view-list/data-view-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { UsersComponent } from './components/admin/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'sports', component: SportsNewsComponent},
  { path: 'addNews', component: AddNewsComponent, canActivate: [AuthGuard] },
  { path: 'dataViewList', component: DataViewListComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'contactUs', component: ContactUsComponent},
  { path: 'aboutUs', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    ChatBoxComponent,
    WeatherComponent,
    NewsComponent,
    AboutUsComponent,
    ContactUsComponent,
    SportsNewsComponent,
    ImageSliderComponent,
    RegisterComponent,
    LoginComponent,
    AddNewsComponent,
    DataViewListComponent,
    SearchPipe,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSO3WP_fpt9mUNwsyyHVHjr9eC4KyEdOY'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
