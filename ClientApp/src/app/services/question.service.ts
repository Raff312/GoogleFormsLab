import { Injectable } from "@angular/core";
import { FormItemModel } from "../models/form-item.model";
import { FormModel } from "../models/form.model";
import { QuestionBase } from "../models/question-base";
import { QuestionChoice } from "../models/question-choice";
import { QuestionText } from "../models/question-text";
import { OptionModel } from "../models/question.model";

@Injectable({
    providedIn: "root"
})
export class QuestionService {

    public async getQuestions(form: FormModel): Promise<Array<QuestionBase<string>>> {
        const questions = new Array<QuestionBase<string>>();

        form.items.forEach((formItem: FormItemModel) => {
            if (formItem.question.textQuestion) {
                const question = new QuestionText({
                    key: formItem.title,
                    label: formItem.title,
                    required: formItem.question.required ?? false,
                    type: "text"
                });
                questions.push(question);
            } else if (formItem.question.choiceQuestion) {
                const question = new QuestionChoice({
                    key: formItem.title,
                    label: formItem.title,
                    required: formItem.question.required ?? false,
                    options: []
                });
                formItem.question.choiceQuestion.options.forEach((option: OptionModel) => {
                    question.options.push({ key: option.value, value: option.value });
                });

                questions.push(question);
            }
        });

        return questions;
    }

}
