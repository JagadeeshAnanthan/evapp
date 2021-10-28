import { Component, Inject, OnInit } from '@angular/core';;
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BgEvConfigService } from 'app/bgev-config-service/bgev-config-service';
import { SlotSlectionService } from './bgev-slot-selection.service';

@Component({
  selector: 'map-request-dialog-box',
  templateUrl: './request-dialog-box.component.html',
  styleUrls: ['./request-dialog-box.component.scss']
})
export class RequestDialogBoxComponent implements OnInit {
  isLoggedIn: any;
  chargePointID;
  errorMessage: any;
  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<RequestDialogBoxComponent>, 
    private _snackBar: MatSnackBar, private configService: BgEvConfigService, private slotService : SlotSlectionService) { }
  giveRequest() {
    let slotDetails = {
      chargepoint: this.chargePointID,
      slotStartTime: this.data.selectedSlot,
      slotEndTime: '00:00'
    }
    this.slotService.updateSlot(slotDetails).subscribe({
      next: response => {
        console.log(response)
      },
      error: err => {
        this.errorMessage = err;
      }
    }
    )
    this.isLoggedIn=localStorage.getItem('loggedIn');
    localStorage.setItem('selectedTimeSlot',this.data.selectedSlot);
    if(this.isLoggedIn=='yes')
    {
      this._snackBar.open('Requested', '', {
        duration: 1500
      });
      this.dialogRef.close();
      /* setTimeout(function () {
        this.router.navigate([`./home`]);
    }, 2000); */
      setTimeout(() => {
        this.router.navigate(['./booking-confirmation']);
        this._snackBar.open('Request Accepted', '', {
          duration: 1500
        });
      }, 2500);
    }
    else
    {
      
      this.configService.setCurrentTab('Login');
      this._snackBar.open('Login to Raise Request', '', {
        duration: 1500
      });
      this.dialogRef.close();      
      this.router.navigate(['./payment']);
    }  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.chargePointID = localStorage.getItem('chargePointId')
  }

}
