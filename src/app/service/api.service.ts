import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Veiculo } from './../model/veiculo';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiCarro = '/api/carros';
const apiMarca = '/api/marcas';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {}

  getVeiculos (): Observable<Veiculo[]>{
    return this.http.get<Veiculo[]>(apiCarro)
    .pipe(
      tap(veiculos => console.log('leu os veiculos')),
      catchError(this.handleError('getVeiculos', []))
    );
  }

  getVeiculo (id: number): Observable<Veiculo> {
    const url = '${apiCarro}/${id}';
    return this.http.get<Veiculo>(url).pipe(
      tap(_=> console.log('Leu o carro id=${id}')),
      catchError(this.handleError<Veiculo>('getVeiculo id=${id}'))
    );
  }

  addVeiculo (veiculo) : Observable<Veiculo> {
    return this.http.post<Veiculo>(apiCarro, veiculo, httpOptions).pipe(
      //tslint:disable-next-line:no-shadowed-variable
      tap((veiculo : Veiculo) => console.log('adicionou o veiculo com o id=${veiculo._id}')),
      catchError(this.handleError<Veiculo>('addVeiculo'))
    );
  }

  updateVeiculo(id, produto): Observable<any> {
    const url = '${apiCarro}/${id}';
    return this.http.put(url, produto, httpOptions). pipe(
      tap(_ => console.log('Atualiza o veiculo com o id=${id}')),
      catchError(this.handleError<any>('updateVeiculo'))
    );
  }

  deleteVeiculo(id): Observable<Veiculo> {
    const url = '${apiCarros}/delete/${id}';
    return this.http.delete<Veiculo>(url, httpOptions).pipe(
      tap(_ => console.log('remove o veiculo com o id=${id'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
