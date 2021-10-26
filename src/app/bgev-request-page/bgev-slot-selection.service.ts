import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SlotSlectionService {
    data: any=[]
    httpOptions = {
        /* headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }), */
        observe: 'response'
    };
    constructor(private http: HttpClient) {}

    updateSlot(slotDetails): Observable<any[] | HttpResponse<any[]>> {
        let url = 'https://cjr7i80ep2.execute-api.us-east-2.amazonaws.com/test/bookings'
        return this.http.post<any[]>(url, slotDetails, {observe: 'response'}).pipe(
            tap(Response => {return Response})
        );
    }

    getAvailableSlots(chargePointId): Observable<any[]> {
        let url = 'https://cjr7i80ep2.execute-api.us-east-2.amazonaws.com/test/bookings?deviceid='+chargePointId;
        return this.http.get<any[]>(url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }


}