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
import { SaveComponent } from './Image/buttons/save/save.component';
import { ShareComponent } from './Image/buttons/share/share.component';
import { DownloadCanvasComponent } from './Image/buttons/download-canvas/download-canvas.component';
import { RemoveImageComponent } from './Image/buttons/remove-image/remove-image.component';
import { ShareWindowComponent } from './Image/share-window/share-window.component'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AlertModule } from 'ng2-bootstrap';
import { AuthenticationService } from './base/authentication.service';
import { BiggerImageComponent } from './Image/buttons/bigger-image/bigger-image.component';
import { ActivationUserComponent } from './User/activation-user/activation-user.component';

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
        DownloadCanvasComponent,
        RemoveImageComponent,
        ShareWindowComponent,
        BiggerImageComponent,
        ActivationUserComponent
    ],
    imports: [
        BrowserModule,
        AlertModule.forRoot(),
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [AuthenticationService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule { }
