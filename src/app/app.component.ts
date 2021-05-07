import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "./_helpers/must-match.validator";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        mobile_number: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10)
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        dob: ["", [Validators.required]],
        address: [""],
        city: [""],
        state: [""],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  stripText(event) {
    const seperator = "^([0-9])";
    const maskSeperator = new RegExp(seperator, "g");
    let result = maskSeperator.test(event.key);
    return result;
  }

  alphabetTextOnly(event) {
    const key = event.keyCode;
    if ((key >= 15 && key <= 64) || key >= 123 || (key >= 96 && key <= 105)) {
      event.preventDefault();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }
}
