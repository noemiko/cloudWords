import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./content/content.component";
import {CreatorComponent} from "./creator/creator.component";


const APP_ROUTES: Routes = [
    {path:'', component:ContentComponent},
    {path:'creator', component:CreatorComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
