import { Injectable } from "@angular/core";
import { FormModel } from "../models/form.model";
import { ApiClient } from "./api.client";

@Injectable({
    providedIn: "root"
})
export class FormsService {

    constructor(private readonly api: ApiClient) {
    }

    private get apiRoot(): string {
        return "api/forms";
    }

    public async getForm(id: string): Promise<FormModel> {
        const data = await this.api.get(`${this.apiRoot}/${id}`);
        return new FormModel(data);
    }

    public async sendForm(id: string, data: unknown): Promise<void> {
        await this.api.post(`${this.apiRoot}/${id}`, data);
    }

}
