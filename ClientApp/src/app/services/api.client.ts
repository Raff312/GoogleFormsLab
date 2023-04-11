/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class ApiClient {

    private apiRoot: string;

    constructor(
        protected http: HttpClient,
        protected router: Router,
        protected zone: NgZone
    ) {
        this.apiRoot = "https://localhost:7228";
    }

    public get(url: string): Promise<any> {
        const observable = this.http.get(`${this.apiRoot}/${url}`, { headers: this.getHeaders(), observe: "response", withCredentials: this.getCredentialsOption() });
        return this.subscribe(observable);
    }

    public delete(url: string): Promise<any> {
        const observable = this.http.delete(`${this.apiRoot}/${url}`, { headers: this.getHeaders(), observe: "response", withCredentials: this.getCredentialsOption() });
        return this.subscribe(observable);
    }

    public post(url: string, data: any): Promise<any> {
        const observable = this.http.post(`${this.apiRoot}/${url}`, JSON.stringify(data), { headers: this.getHeaders(), observe: "response", withCredentials: this.getCredentialsOption() });
        return this.subscribe(observable);
    }

    public put(url: string, data: any): Promise<any> {
        const observable = this.http.put(`${this.apiRoot}/${url}`, JSON.stringify(data), { headers: this.getHeaders(), observe: "response", withCredentials: this.getCredentialsOption() });
        return this.subscribe(observable);
    }

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({ "content-type": "application/json", "cache-control": "no-cache" });
    }

    protected getCredentialsOption(): boolean | undefined {
        return undefined;
    }

    protected subscribe(observable: Observable<object>): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            observable.subscribe({
                next: r => {
                    setTimeout(() => {
                        this.zone.run(() => {
                            resolve(r["body"]);
                        });
                    });
                },
                error: r => {
                    reject(r);
                }
            });
        });

        return promise;
    }

}
