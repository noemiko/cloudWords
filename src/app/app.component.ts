import { Component , ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<navigation-bar></navigation-bar>
              <router-outlet></router-outlet>
              <footer></footer>`
})
export class AppComponent {

}
