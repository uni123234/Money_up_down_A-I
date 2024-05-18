import { CommonModule, isPlatformBrowser } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'Transaction';
  isAuthenticated: boolean = false
  isBrowser: boolean;


  constructor (@Inject(PLATFORM_ID) private platformId: Object ,private authService: AuthService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
  }
}
