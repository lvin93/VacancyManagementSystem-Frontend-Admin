import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule],
})
export class HeaderComponent {

}
