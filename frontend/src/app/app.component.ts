import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

<<<<<<< HEAD

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
=======
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
>>>>>>> ab46e9143c5ab9b5228fa6981f8e6b522c59e209
})
export class AppComponent {
  title = 'frontend';
}
