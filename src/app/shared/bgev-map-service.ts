import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

declare var H: any;

@Injectable({
    providedIn: 'root'
})
export class BgevMapService {

    public platform: any;
    public geocoder: any;
    

    public constructor(private http: HttpClient) {
        this.platform = new H.service.Platform({
            apikey: 'PYLxxmi0DvOjFtD7SP5mvV5r0gHw6Oo9OwR9lxhRv18'
        });
        this.geocoder = this.platform.getGeocodingService();
    }

    public getAddress(query: string) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ searchText: query }, result => {
                if (result.Response.View.length > 0) {
                    if (result.Response.View[0].Result.length > 0) {
                        resolve(result.Response.View[0].Result);
                    } else {
                        reject({ message: 'no results found' });
                    }
                } else {
                    reject({ message: 'no results found' });
                }
            }, error => {
                reject(error);
            });
        });
    }

    public getAddressFromLatLng(query: string) {
        return new Promise((resolve, reject) => {
            this.geocoder.reverseGeocode({ prox: query, mode: 'retrieveAddress' }, result => {

                if (result.Response.View.length > 0) {
                    if (result.Response.View[0].Result.length > 0) {
                        resolve(result.Response.View[0].Result);
                    } else {
                        reject({ message: 'no results found' });
                    }
                } else {
                    reject({ message: 'no results found' });
                }
            }, error => {
                reject(error);
            });
        });
    }

    public getChargePointsLocations(postcode: string): Observable<any[]> {
        let url = 'https://m88yb0phs4.execute-api.us-east-2.amazonaws.com/Test/charge-points?postcode='+postcode+'&radious=1&chargertype=1';
        return this.http.get<any[]>(url).pipe(
            tap(data => {
                console.log(JSON.stringify(data))
            }),
            catchError(this.handleError)
        );
    }

    /* public getSlot(): Observable<any[]> {
        let url = 'https://cjr7i80ep2.execute-api.us-east-2.amazonaws.com/test/bookings?deviceid=98763636';
        return this.http.get<any[]>(url).pipe(
            tap(data => {
                console.log(JSON.stringify(data))
            }),
            catchError(this.handleError)
        );
    } */

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}
