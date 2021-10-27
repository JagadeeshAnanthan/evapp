import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'bgev-charging-page',
    templateUrl: './bgev-charging-page.component.html',
    styleUrls: ['./bgev-charging-page.component.scss']
})

export class BgEvChargingPageComponent {
    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'determinate';
    value = 50;
    constructor(private router: Router) { }

    redirectToPayment() {
        this.router.navigate([`./payment`]);
    }
}