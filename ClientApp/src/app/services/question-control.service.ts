import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { QuestionBase } from "../models/question-base";

@Injectable({
    providedIn: "root"
})
export class QuestionControlService {

    public toFormGroup(questions: QuestionBase<string>[]): FormGroup {
        const group: unknown = {};

        questions.forEach(question => {
            group[question.key] = question.required ?
                new FormControl(question.value || "", Validators.required) :
                new FormControl(question.value || "");
        });
        return new FormGroup(group);
    }

}
