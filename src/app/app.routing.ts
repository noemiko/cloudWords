import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {ContentComponent} from "./content/content.component";
import {CreatorComponent} from "./creator/creator.component";
import {GalleryComponent} from "./gallery/gallery.component";


const APP_ROUTES: Routes = [
    {path:'', component:ContentComponent},
    {path:'creator', component:CreatorComponent},
    {path:'gallery', component:GalleryComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
