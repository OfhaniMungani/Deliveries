import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
//import { Camera } from '@ionic-native/camera/ngx';
import{defineCustomElements} from'@ionic/pwa-elements/loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsPage } from './tabs/tabs.page';

@NgModule({
  declarations: [AppComponent,LoginFormComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,],
  providers: [Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
defineCustomElements(window);