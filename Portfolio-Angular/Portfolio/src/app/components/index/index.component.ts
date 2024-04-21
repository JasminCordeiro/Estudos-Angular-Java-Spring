import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,NgOptimizedImage],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
