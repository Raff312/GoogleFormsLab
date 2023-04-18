import { BaseModel } from "./base.model";
import { FormItemModel, IFormItemModel } from "./form-item.model";

export class FormModel extends BaseModel {

    public id: string;
    public title: string;
    public items: Array<FormItemModel>;

    constructor(data?: IFormModel) {
        super();
        if (data) {
            this.mapFromJson(data);

            if (data.items) {
                this.items = BaseModel.convertArray(FormItemModel, data.items);
            }
        }
    }

}

export interface IFormModel {
    id: string;
    title: string;
    items: Array<IFormItemModel>;
}
