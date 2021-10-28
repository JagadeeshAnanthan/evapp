import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
// import { Auth } from 'aws-amplify';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';
import { LoginService } from './bgev-login.service';

@Component({
    selector: 'bgev-login',
    templateUrl: './bgev-login.component.html',
    styleUrls: ['./bgev-login.component.css']
})
export class BgEvLoginComponent implements OnInit{
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
    loadComplete = false;
    validateFlag = "Y";
    buttonShow = true;
    passwordShow = false;
    errorMessage: any;
    constructor(private router: Router, private configService: BgEvConfigService, private loginService: LoginService) {}

    async login(login_id: string, password: string) {
        let userDetails: any = {
            email: login_id,
            validateuser: this.validateFlag,
            password: password
        }
        await this.loginService.validateUser(userDetails).subscribe(response=> {
            console.log("Response is",response);
        });
        this.loginService.validateUser(userDetails).subscribe({
            next: Response => {
            let res = [];
            res.push(Response);
            console.log("Res is",res);
            if(res[0].userstatus == "LOGINSUCCESS"){
            this.router.navigate(['./evloggedin']);
            }
        },
            error: err => {
                this.errorMessage = err;
                console.log(err.error.userstatus)
                this.router.navigate(['./evowner']);
            }
            
        });

    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    
    getPasswordErrorMsg() {
        return this.password.hasError('required') ? 'Please enter your password' : '';
    }

    async toggle(login_id) {
        let userDetails: any = {
            email: login_id,
            validateuser: this.validateFlag
        }
        this.loginService.validateUser(userDetails).subscribe({
            next: Response => {
            console.log("Response is", Response);
            let res = [];
            res.push(Response);
            console.log("Res is",res);
            if(res[0].userstatus == "VALIDUSER"){
                this.passwordShow = !this.passwordShow;
                this.buttonShow = !this.buttonShow;
                this.validateFlag = 'N'
            }
            
        },
            error: err => {
                this.errorMessage = err;
                console.log(err.error.userstatus)
                this.redirectToRegister;
            }
            
        });
    }

    ngOnInit() {
        localStorage.clear()
        setTimeout(() => {
            this.loadComplete = true;
        }, 1500);
    }
    redirectToRegister() {
        this.configService.setCurrentTab('Register');
        this.router.navigate(['./evowner']);  
    }
}