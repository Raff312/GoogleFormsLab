import { BaseModel } from "./base.model";
import { QuestionModel, IQuestionModel } from "./question.model";

export class FormItemModel extends BaseModel {

    public title: string;
    public question: QuestionModel;

    constructor(data?: IFormItemModel) {
        super();
        if (data) {
            this.mapFromJson(data);

            if (data.question) {
                this.question = new QuestionModel(data.question);
            }
        }
    }

}

export interface IFormItemModel {
    title: string;
    question: IQuestionModel;
}
