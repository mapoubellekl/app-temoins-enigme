import { Component } from '@angular/core';
import { EnigmeComponent } from './enigme/enigme.component';
import { EnigmePerMonth } from './beans/enigmePerMonth';
import { ENIGMES_LIST } from './beans/mockEnigmesPerMonth';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-temoins-enigme';

  enigmesPerMonth = ENIGMES_LIST;
  selectedEnigmePerMonth?: EnigmePerMonth;


  onSelect(enigmePerMonth: EnigmePerMonth): void {
    this.selectedEnigmePerMonth = enigmePerMonth;
  }

  onSidenavClose(idEnigme:number){

  }


}
