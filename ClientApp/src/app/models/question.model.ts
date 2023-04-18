import { BaseModel } from "./base.model";

export class QuestionModel extends BaseModel {

    public required?: boolean;
    public textQuestion?: TextQuestionModel;
    public choiceQuestion?: ChoiceQuestionModel;

    constructor(data?: IQuestionModel) {
        super();
        if (data) {
            this.mapFromJson(data);

            if (data.textQuestion) {
                this.textQuestion = new TextQuestionModel(data.textQuestion);
            }

            if (data.choiceQuestion) {
                this.choiceQuestion = new ChoiceQuestionModel(data.choiceQuestion);
            }
        }
    }

}

export interface IQuestionModel {
    required?: boolean;
    textQuestion?: ITextQuestionModel;
    choiceQuestion?: IChoiceQuestionModel;
}

export class TextQuestionModel extends BaseModel {

    constructor(data?: ITextQuestionModel) {
        super();
        if (data) {
            this.mapFromJson(data);
        }
    }

}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITextQuestionModel {
}

export class ChoiceQuestionModel extends BaseModel {

    public options: Array<OptionModel>;

    constructor(data?: IChoiceQuestionModel) {
        super();
        if (data) {
            this.mapFromJson(data);

            if (data.options) {
                this.options = BaseModel.convertArray(OptionModel, data.options);
            }
        }
    }

}

export interface IChoiceQuestionModel {
    options: Array<IOptionModel>;
}

export class OptionModel extends BaseModel {

    public value: string;

    constructor(data?: IOptionModel) {
        super();
        if (data) {
            this.mapFromJson(data);
        }
    }

}

export interface IOptionModel {
    value: string;
}
