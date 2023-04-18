import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase } from "src/app/models/question-base";
import { FormsService } from "src/app/services/forms.service";
import { QuestionControlService } from "src/app/services/question-control.service";
import { QuestionService } from "src/app/services/question.service";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {

    private readonly FORM_ID = "1K78caRyuK5Lqg4l9tkFAG2DLV6CU7e5tRjmhIQnOxYM";

    public questions: Array<QuestionBase<string>>;
    public form: FormGroup;
    public formTitle: string;

    constructor(
        private readonly formsService: FormsService,
        private readonly questionService: QuestionService,
        private readonly questionControlService: QuestionControlService
    ) {
    }

    public async ngOnInit(): Promise<void> {
        const form = await this.formsService.getForm(this.FORM_ID);
        this.formTitle = form.title;
        this.questions = await this.questionService.getQuestions(form);
        this.form = this.questionControlService.toFormGroup(this.questions);
    }

    public async onSubmit(): Promise<void> {
        try {
            await this.formsService.sendForm(this.FORM_ID, this.form.getRawValue());
            alert("Request sended");

            this.form.reset();
        } catch {
            alert("Something went wrong");
        }
    }

}
