import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from 'aws-amplify';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/bgev-login/bgev-login.service';

@Component({
    selector: 'bgev-ev-owner',
    templateUrl: './bgev-ev-owner-component.html',
    styleUrls: ['./bgev-ev-owner-component.scss']
})
export class BgEvOwnerComponent implements OnInit {
    user_name = new FormControl('', [Validators.required, Validators.minLength(4)]);
    mobile_no = new FormControl('', [Validators.required]);
    mail = new FormControl('', [Validators.required, Validators.email]);
    new_password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    confirm_password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    hide = true;
    loadComplete = false;
    isDisabled = false;
    errorMessage: any;
    constructor(private router: Router, private _snackBar: MatSnackBar, private loginService : LoginService) {}

    getNameErrorMessage() {
        return this.user_name.hasError('required') ? 'You must enter a value' :
            this.user_name.hasError('minlength') ? 'Should be atleast 4 characters long' :
                '';
    }

    getMobileErrorMessage() {
        return this.mobile_no.hasError('required') ? 'You must enter a value' : '';
    }

    getMailErrorMessage() {
        return this.mail.hasError('required') ? 'You must enter a value' :
            this.mail.hasError('email') ? 'Not a valid email' :
                '';
    }

    getPasswordErrorMessage() {
        return this.new_password.hasError('required') ? 'You must enter a value' :
            this.new_password.hasError('minlength') ? 'Should be atleast 8 characters long' : '';
    }

    getConfirmPasswordErrorMessage() {
        return this.confirm_password.hasError('required') ? 'You must enter a value' :
            this.confirm_password.hasError('minlength') ? 'Should be atleast 8 characters long' : this.passwordMismatch() ? 'Password does not match' : '';
    }

    passwordMismatch() {
        if (this.new_password !== this.confirm_password) {
            return true;
        } else {
            return false;
        }
    }

    async registeredUser(mail,newPassword) {
        const user = {
            email: mail,
            password: newPassword,
            accountnumber: "4278964"
         }
         /* try {
            this.isDisabled = true;
             const data = await Auth.signUp(user);

             console.log('userConfirmation::', data.userConfirmed);

             this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
                duration: 500
             });
             this.router.navigate(['login']);

         } catch (error) {
            alert('Invalid Data!')
         } */
         this.loginService.userSignUp(user).subscribe({
             next: response => {
                 console.log(response);
             },
             error: err => this.errorMessage = err
         })
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 500);
    }
}
