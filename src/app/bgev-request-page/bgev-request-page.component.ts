import {Component, OnInit} from '@angular/core';
import { BgEvService } from 'app/shared/bgev.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';
import { MatDialog } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { RequestDialogBoxComponent } from '../bgev-request-page/request-dialog-box.component';
import { SlotSlectionService } from './bgev-slot-selection.service';


@Component({
    selector: 'bgev-request-page',
    templateUrl: 'bgev-request-page.component.html',
    styleUrls: ['bgev-request-page.component.scss']
})

export class BgEvRequestPageComponent implements OnInit{
    fontStyleControl = new FormControl();
    fontStyle?: string;
    chargePointDetails: any = [ ]
    loginType: string;
    isLoggedIn: boolean;
    chargePointID;
    bookedSlots: any = [];
    amenities: any = [];
    displayTimings: any = [];
    slotTimes: any = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', 
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'];
    rating = 0;
    utilization = 0;
    chargerType = 'CCA';
    price = '20';
    errorMessage: any;
    constructor(private bgevservice: BgEvService, private router: Router,
        private location: Location, private _snackBar: MatSnackBar, private configService: BgEvConfigService, public dialog: MatDialog, public slotService: SlotSlectionService) {
        this.loginType = localStorage.getItem('loginType');
        this.isLoggedIn = localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'yes';
    }
    ngOnInit(): void {
        this.bgevservice.currentData.subscribe(data => {
            /* if (data.length === 0) {
                this.router.navigate(['./login']);
                return false;
            } */
            this.chargePointDetails = data;
            this.chargerType = localStorage.getItem('chargerType')
            this.price = localStorage.getItem('price')
            this.amenities = this.configService.getAvailableAmenities();
            this.rating = Math.floor(Math.random() * (5 - 1) + 1);
            this.utilization = Math.floor(Math.random() * (10 - 1) + 1);
            this.setDisplayTimings();
        });
        this.chargePointID = localStorage.getItem('chargePointId');
        this.slotService.getAvailableSlots(this.chargePointID).subscribe({
            next: data => {
                this.bookedSlots = data[0].slotStartTime;
                console.log(this.bookedSlots);
            },
            error: err => {
                this.errorMessage = err
            }
        })

    }

    setDisplayTimings() {
        let start = new Date().getHours()*2;
        console.log(start);
        let ind = 0;
        for(let i: any = 0; i<24; i++) {
             ind = (start+i)%48;
            this.displayTimings.push(this.slotTimes[ind]);
        }
        console.log(this.displayTimings);
    }

    goBack() {
        this.location.back();
    }

    requested(selectedSlot) {
        console.log(selectedSlot);
        if(this.isLoggedIn) {
            this.openDialog(selectedSlot);
            // this.router.navigate(['./payment']);
        } else {
            this.configService.setCurrentTab('Login');
            this._snackBar.open('Please Login to request.', '', {
                duration: 2000
            });
            this.router.navigate(['./payment']);
        }       
    }

    openDialog(selectedSlot) {
        const dialogRef = this.dialog.open(RequestDialogBoxComponent, {
            width: '400px',
            data: {
                selectedSlot: selectedSlot
            }
        });
    }

}