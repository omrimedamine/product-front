import {AuthService} from "../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, Button]
})
export class NavComponent {
  private router = inject(Router);
  protected authService = inject(AuthService);


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
