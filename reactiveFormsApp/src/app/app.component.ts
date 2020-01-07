import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([
        new FormControl()
      ])
    });

    this.signupForm.valueChanges.subscribe(value =>
      console.log("Value + form", value, this.signupForm)
    );
    this.signupForm.statusChanges.subscribe(status =>
      console.log("Status", status)
    );

    this.signupForm.setValue({
      userData: {
        username: "Alexey",
        email: "alex@test.com"
      },
      gender: "male",
      hobbies: ['smoking']
    });

    this.signupForm.patchValue({
      userData: {
        username: "Anna"
      }
    });
  }

  public get hobbies() {
    // return <FormArray>this.signupForm.get('hobbies');
    return this.signupForm.get('hobbies') as FormArray;
  }

  public onSubmit() {
    console.log('signupForm', this.signupForm);
    this.signupForm.reset();
  }

  public onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);

    console.log('Hobbies value:', this.hobbies.value);
    const hobbies = this.hobbies.value.slice();
    hobbies[0] = 'Drinking';
    this.hobbies.setValue(hobbies);
  }

  private forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    // tslint:disable-next-line: no-bitwise
    if (~this.forbiddenUsernames.indexOf(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // * async validator
  private forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
