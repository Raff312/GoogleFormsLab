/* eslint-disable @typescript-eslint/no-explicit-any */
export class BaseModel {

    protected mapFromJson(json: any): void {
        for (const key in json) {
            try {
                this[key] = json[key];
            } catch (e) {
                // do nothing
            }
        }
    }

    public static create<T>(type: new (data: any) => T, data: any): T {
        return new type(data);
    }

    public static convertArray<T>(type: new (data: any) => T, data: any[]): T[] {
        if (!data) { return null; }
        return data.map(item => BaseModel.create(type, item));
    }

}
