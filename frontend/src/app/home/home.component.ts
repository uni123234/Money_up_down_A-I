import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterOptions } from 'express';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
