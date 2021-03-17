import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {routing} from './app.routing';
import {RouterModule} from '@angular/router';
import {FormComponent} from './form/form.component';
import {TableComponent} from './table/table.component';
import {PointRepository} from './services/pointRepository';
import {REST_URL, AUTH_URL, RestDataSource} from './services/rest.datasource';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth';
import {AuthGuard} from './guard/auth.guard';
import {NotFoundComponent} from './error/notFound.component';
import {ModelResolver} from './model/model.resolver';
import {MessageService} from './messages/message.service';
import {MessageModule} from './messages/messages.module';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, FormComponent, TableComponent, NotFoundComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        RouterModule,
        routing,
        MessageModule
    ],
  providers: [
    RestDataSource,
    PointRepository,
    AuthService,
    AuthGuard,
    ModelResolver,
    MessageService,
    // {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    {provide: LOCALE_ID, useValue: "ru-RU"},
    {provide: REST_URL, useValue: "http://localhost:16100/PointServiceAPI/points"},
    {provide: AUTH_URL, useValue: "http://localhost:16100/PointServiceAPI/auth"}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
