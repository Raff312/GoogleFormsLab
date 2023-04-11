import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ApiClient } from "./services/api.client";
import { AppState } from "./app.state";
import { FormComponent } from "./components/form/form.component";
import { FormsService } from "./services/forms.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: "", component: FormComponent
            },
            {
                path: "**", redirectTo: ""
            }
        ])
    ],
    providers: [
        ApiClient,
        AppState,
        FormsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
