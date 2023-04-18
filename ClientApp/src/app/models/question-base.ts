export class QuestionBase<T> {

    public value: T|undefined;
    public key: string;
    public label: string;
    public required: boolean;
    public order: number;
    public controlType: string;
    public type: string;
    public options: {key: string, value: string}[];

    constructor(
        options: {
            value?: T;
            key?: string;
            label?: string;
            required?: boolean;
            order?: number;
            controlType?: string;
            type?: string;
            options?: { key: string, value: string }[];
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || "";
        this.label = options.label || "";
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || "";
        this.type = options.type || "";
        this.options = options.options || [];
    }

}
