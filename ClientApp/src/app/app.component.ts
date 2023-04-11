import { Component } from "@angular/core";
import { AppState } from "./app.state";

@Component({
    selector: "root",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(
        public readonly appState: AppState
    ) { }

}
