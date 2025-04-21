import {
    Component,
  } from "@angular/core";
import { MenuItem } from "primeng/api";
  import { PanelMenuModule } from 'primeng/panelmenu';
import {NavComponent} from "../../../nav/nav.component";

  @Component({
    selector: "app-panel-menu",
    standalone: true,
    imports: [PanelMenuModule, NavComponent],
    template: `
        <p-panelMenu [model]="items" styleClass="w-full" />
        <app-nav></app-nav>
    `
  })
  export class PanelMenuComponent {

    public readonly items: MenuItem[] = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            routerLink: ['/home']
        },
        {
            label: 'Produits',
            icon: 'pi pi-barcode',
            routerLink: ['/products/list']
        },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: ['/contact']
      }
    ]
  }
