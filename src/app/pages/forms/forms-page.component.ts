import {Component, OnInit}                               from "@angular/core";
import {ActivatedRoute}                                  from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContentfulService}                               from "../../services/contentful/contentful.service";
import {ContentType}                                     from "contentful-management/typings/contentType";
import {Field}                                           from "contentful";

export interface DynamicForm {
    formGroup: FormGroup;
    fields: DynamicFormElement[];
}

export interface DynamicFormElement {
    id: string;
    type: string;
    name: string;
    items: string[];
    control: FormControl,
}

@Component({
    selector: 'abi-forms',
    templateUrl: 'forms-page.component.html'
})
export class FormsPageComponent implements OnInit {
    formId: string;
    formType: ContentType;

    dynamicForm: DynamicForm;

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private ctf: ContentfulService) {
        this.formId = route.snapshot.paramMap.get('type');
    }

    async ngOnInit() {
        if (!this.formId) return;
        this.formType = await this.ctf.getFormFromType(this.formId);
        this.buildFromFieldList();
    }

    buildFromFieldList() {
        this.dynamicForm = {formGroup: this.fb.group({}), fields: []};
        this.formType.fields.map(field => {
            const validators = this.buildValidators(field);

            if (field.type === 'Array') {
                const arr = field.items.validations[0].in.map(s => {
                    return this.fb.control(false);
                });
                this.dynamicForm.formGroup.addControl(field.id, this.fb.array(arr));
            }
            const control = this.fb.control('', validators);
            this.dynamicForm.formGroup.addControl(field.id, control);
            this.dynamicForm.fields.push({
                id: field.id,
                type: field.type,
                name: field.name,
                items: field.type === 'Array' ? field.items.validations[0].in : [],
                control,
            });
        });
    }

    buildValidators(field) {
        console.log('buildValidators for', field.name, 'with', field);
        const validators = [];
        if (field.required) validators.push(Validators.required);

        if (field.type === 'Boolean') validators.push(Validators.requiredTrue);

        if (!field.validations) return validators;
        field.validations.forEach(validation => {
            console.log(field.name, validation);
            if (validation.hasOwnProperty('regexp')) validators.push(Validators.pattern(validation.regexp.pattern));
        });
        return validators;
    }

    send() {
        const preparedValue = this.remapFormEntry();
        this.ctf.createFormEntry(this.formId, preparedValue);
    }

    private remapFormEntry() {
        const formValue = this.dynamicForm.formGroup.value;

        return Object.keys(formValue).reduce((newForm, field) => {
            const fieldDef = this.formType.fields.find(f => f.id === field);
            if (fieldDef.type === 'Array') {
                const arrValMap = formValue[field].reduce((arr, val, idx) => {
                    if (val) return [...arr, fieldDef.items.validations[0].in[idx]];
                    return arr;
                }, []);
                return {...newForm, [field]: arrValMap};
            }

            return {...newForm, [field]: formValue[field]};

        }, {});
    }
}
