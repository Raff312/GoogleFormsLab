import { Component, OnInit } from "@angular/core";
import { FormsService } from "../../services/forms.service";

@Component({
    selector: "form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {

    constructor(
        private readonly formsService: FormsService
    ) {
    }

    public async ngOnInit(): Promise<void> {
        const form = await this.formsService.getForm("13qfRfw3pPf7ku-vkGehPOamSfnTnyfp7JgSt8la5RGY");
        console.log(form);
    }

}
