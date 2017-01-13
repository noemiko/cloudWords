import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header/header.component';
import { ContentComponent } from './base/content/content.component';
import { FooterComponent } from './base/footer/footer.component';
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
import { LogOutComponent } from './User/log-out/log-out.component';
import { SaveComponent } from './Image/save/save.component';
import { ShareComponent } from './Image/share/share.component';
import {SafePipe} from './safeHelper';
import { DownloadCanvasComponent } from './Image/download-canvas/download-canvas.component';
import { RemoveImageComponent } from './Image/remove-image/remove-image.component'

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
    ResetPasswordComponent,
    LogOutComponent,
    SaveComponent,
    ShareComponent,
    SafePipe,
    DownloadCanvasComponent,
    RemoveImageComponent
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
