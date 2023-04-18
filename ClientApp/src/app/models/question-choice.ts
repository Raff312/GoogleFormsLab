import { QuestionBase } from "./question-base";

export class QuestionChoice extends QuestionBase<string> {

    override controlType = "choice";

}
