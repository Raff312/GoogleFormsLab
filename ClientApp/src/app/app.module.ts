import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ApiClient } from "./services/api.client";
import { AppState } from "./app.state";
import { FormComponent } from "./components/form/form.component";
import { FormsService } from "./services/forms.service";
import { FormQuestionComponent } from "./components/form-question/form-question.component";
import { QuestionControlService } from "./services/question-control.service";
import { QuestionService } from "./services/question.service";

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        FormQuestionComponent
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: "", component: FormComponent
            },
            {
                path: "**", redirectTo: ""
            }
        ]),
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ApiClient,
        AppState,
        FormsService,
        QuestionControlService,
        QuestionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
