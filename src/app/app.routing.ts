import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./content/content.component";
import {CreatorComponent} from "./creator/creator.component";
import {UserGalleryComponent} from "./Image/gallery/gallery.component";
import {RegisterComponent} from "./User/register/register.component";
import {LoginComponent} from "./User/login/login.component";
import { PassChangeComponent } from './User/user-profile/pass-change.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';



const APP_ROUTES: Routes = [
    {path:'', component:ContentComponent},
    {path:'creator', component:CreatorComponent},
    {path:'gallery', component:UserGalleryComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'changepass', component:PassChangeComponent},
    {path:'resetpass', component:ResetPasswordComponent},
    {path:'changepass/:email/:hash', component:PassChangeComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
