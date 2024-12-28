import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from 'src/environments/endpoints';
import { isNotEmptyArray } from 'src/app/utils/tools/isNotEmptyArray';
import { isValueDefined } from 'src/app/utils/tools/isValueDefined';

interface HttpOptions {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
      includeHeaders?: string[];
  } | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public httpGet<Q, R>(endpoint: Endpoints, urlIDs: string[] | undefined, queryParams?: Q & { [key: string]: any }): Observable<R> {
    const url = this.buildUrl(endpoint, urlIDs);
    const options = this.buildOptions<Q>(queryParams);

    return this.http.get<R>(url, options);
  }

  public httpPost<P, R>(url: Endpoints, urlIDs: string[] | undefined, payload: P): Observable<R> {
    throw new Error('Method not implemented.');
    return this.http.post<R>(url, payload);
  }

  public httpPut<P, R>(url: Endpoints, urlIDs: string[] | undefined, payload: P): Observable<R> {
    throw new Error('Method not implemented.');

    return this.http.put<R>(url, payload);
  }

  public httpDelete<R>(url: Endpoints, urlIDs: string[] | undefined): Observable<R> {
    throw new Error('Method not implemented.');

    return this.http.delete<R>(url);
  }

  private buildOptions<Q>(queryParams?: (Q & { [key: string]: any; })): HttpOptions | undefined {
    if(!isValueDefined(queryParams)) return undefined;

    const params = this.buildQueryParams<Q>(queryParams!);
    const options: HttpOptions = { params };
    return options;
  }

  private buildUrl(url: Endpoints,urlIDs: string[] | undefined): string {
    const resultUrl = url;
    if (isNotEmptyArray(urlIDs)) urlIDs!.forEach((id, index) => resultUrl.replace(`{id${index}}`, id));

    return resultUrl;
  }

  private buildQueryParams<Q>(queryParams: Q & { [key: string]: any; }): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] !== undefined && queryParams[key] !== null) {
        params = params.append(key, queryParams[key].toString());
      }
    });
    return params;
  }
}
