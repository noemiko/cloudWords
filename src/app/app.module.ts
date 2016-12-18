import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { CreatorComponent } from './creator/creator.component';
import { InputDataTextComponent } from './creator/input-data-text/input-data-text.component';
import { CloudService } from './creator/cloud-service.service';
import { CloudDataGridComponent } from './creator/cloud-data-grid/cloud-data-grid.component';
import { routing } from './app.routing';
import { UserGalleryComponent } from './Image/gallery/gallery.component';
import { RegisterComponent } from './User/register/register.component';
import { LoginComponent } from './User/login/login.component';
import { PassChangeComponent } from './User/user-profile/pass-change.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    CreatorComponent,
    InputDataTextComponent,
    CloudDataGridComponent,
    UserGalleryComponent,
    RegisterComponent,
    LoginComponent,
    PassChangeComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [CloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
