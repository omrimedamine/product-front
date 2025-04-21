import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import {AuthenticatedUserCanActivateGuard} from "./gards/auth.guard";
import {ContactComponent} from "./contact/contact.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: "products",
    canActivate: [AuthenticatedUserCanActivateGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: 'contact',
    canActivate: [AuthenticatedUserCanActivateGuard],
    component: ContactComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
