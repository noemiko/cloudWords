import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./base/content/content.component";
import {CreatorComponent} from "./creator/creator.component";
import {UserGalleryComponent} from "./Image/gallery/gallery.component";
import {RegisterComponent} from "./User/register/register.component";
import {LoginComponent} from "./User/login/login.component";
import { PassChangeComponent } from './User/user-profile/pass-change.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { LogOutComponent } from './User/log-out/log-out.component';
import { ShareWindowComponent } from './Image/share-window/share-window.component'
import { ActivationUserComponent } from './User/activation-user/activation-user.component';

const APP_ROUTES: Routes = [
    {path:'', component:ContentComponent},
    {path:'creator', component:CreatorComponent},
    {path:'gallery', component:UserGalleryComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'changepass', component:PassChangeComponent},//changing password when logged
    {path:'resetpass', component:ResetPasswordComponent},
    {path:'changepass/:email/:hash', component:PassChangeComponent},//changing password using e-mail link
    {path:'logout', component:LogOutComponent},
    {path:'share/:id/:hash', component:ShareWindowComponent},
    {path:'activate/:email/:hash', component:ActivationUserComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
