import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    data: any=[]
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        observe: 'response'
    };
    constructor(private http: HttpClient) {}

    validateUser(userDetails): Observable<any[] | HttpResponse<any[]>> {
        let url = "https://ndmt8na1f2.execute-api.us-east-2.amazonaws.com/test/checkuser"
        /* return this.http.post<any[]>(url, userDetails, {observe: response}).pipe(
            tap(res => console.log(JSON.stringify(body))),
            catchError(this.handleError)
        ); */
        return this.http.post<any[]>(url, userDetails, {observe: 'response'}).pipe(
            tap(Response => {return Response})
        );
    }

    userSignUp(user): Observable<any[] | HttpResponse<any[]>> {
        let url = "https://ndmt8na1f2.execute-api.us-east-2.amazonaws.com/test/onboarduser"
        return this.http.post<any[]>(url, user, {observe: 'response'}).pipe(
            tap(response=> {return response})
        );
    }

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