import {Component, inject,} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuComponent} from "./shared/ui/panel-menu/panel-menu.component";
import {AuthService} from "./services/auth.service";
import {CartComponent} from "./cart/cart.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CartComponent],
})
export class AppComponent{
  protected authService = inject(AuthService);
  title = "ALTEN SHOP";
  constructor() {
  }

}
