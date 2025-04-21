import {enableProdMode, importProvidersFrom} from "@angular/core";

import {registerLocaleData} from "@angular/common";
import {provideHttpClient, withInterceptors,} from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {APP_ROUTES} from "app/app.routes";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AppComponent} from "./app/app.component";
import {environment} from "./environments/environment";
import {jwtInterceptor} from "./app/interceptors/jwt.interceptor";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
    ),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService,
  ],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
