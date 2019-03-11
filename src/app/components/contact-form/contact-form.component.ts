import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'abi-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  contactForm: FormGroup;
  submitted: false;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  get f() { return this.contactForm.controls; }

  initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    if (!this.contactForm.valid) return;
    console.log(this.contactForm.value);
  }
}
