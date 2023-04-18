import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase } from "src/app/models/question-base";

@Component({
    selector: "app-form-question",
    templateUrl: "./form-question.component.html",
    styleUrls: ["./form-question.component.scss"]
})
export class FormQuestionComponent {

    @Input() public question: QuestionBase<string>;
    @Input() public form: FormGroup;

    public get isValid() {
        return this.form.controls[this.question.key].valid;
    }

}
