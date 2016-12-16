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
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    CreatorComponent,
    InputDataTextComponent,
    CloudDataGridComponent,
    GalleryComponent
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
