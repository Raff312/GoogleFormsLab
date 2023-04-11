import { BaseModel } from "./base.model";

export class FormModel extends BaseModel {

    public id: string;

    constructor(data?: IFormModel) {
        super();
        if (data) {
            this.mapFromJson(data);
        }
    }

}

export interface IFormModel {
    id: string;
}
